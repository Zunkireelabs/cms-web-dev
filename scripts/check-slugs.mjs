#!/usr/bin/env node
// Guards the two ways a /trading/<slug> URL silently becomes a 404:
//
//   1. A CMS slug holds a character that is reserved in a URL. `&` is the one
//      that bites — Next cannot match a dynamic segment containing one, encoded
//      or not, so the listing links to a page that can never route.
//      ("water-&-wastewater-solutions", 2026-07.)
//   2. A redirect in next.config.mjs points at a slug that has since been
//      renamed in the CMS, so the redirect lands the user on a 404.
//      (/trading/wastewater, /trading/coating, /trading/railings — same date.)
//
// Both are invisible in code review because neither the CMS nor the config
// knows about the other. This script is the join.
import { readFileSync } from 'node:fs'

const CMS_URL = process.env.CMS_URL || 'https://admin-cms.zunkireelabs.com'
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

let docs
try {
  const res = await fetch(`${CMS_URL}/api/product-domains?limit=500&depth=0`, {
    signal: AbortSignal.timeout(15000),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  docs = (await res.json()).docs ?? []
} catch (err) {
  // Never fail a build because the CMS was briefly unreachable — this is a
  // correctness guard, not an availability check.
  console.warn(`SKIP: could not reach CMS at ${CMS_URL} (${err.message})`)
  process.exit(0)
}

if (docs.length === 0) {
  console.warn('SKIP: CMS returned 0 product domains')
  process.exit(0)
}

const errors = []

const slugs = new Set()
for (const d of docs) {
  const slug = d.slug
  if (typeof slug !== 'string' || !SLUG_PATTERN.test(slug)) {
    errors.push(
      `CMS slug ${JSON.stringify(slug)} (${d.title}) is not URL-safe — ` +
        `/trading/${slug} will 404. Fix it in the Payload admin.`,
    )
    continue
  }
  slugs.add(slug)
}

// Every literal /trading/<slug> redirect destination must name a real domain.
const config = readFileSync('next.config.mjs', 'utf8')
for (const [, dest] of config.matchAll(/destination: '\/trading\/([^':]+)'/g)) {
  if (!slugs.has(dest)) {
    errors.push(
      `next.config.mjs redirects to /trading/${dest}, which no longer exists in the CMS — ` +
        `that redirect lands users on a 404. Update it to the current slug.`,
    )
  }
}

if (errors.length > 0) {
  console.error('Broken /trading routes:\n')
  errors.forEach((e) => console.error(`  - ${e}`))
  process.exit(1)
}

console.log(`OK: ${slugs.size} product-domain slugs are URL-safe and all redirects resolve.`)
