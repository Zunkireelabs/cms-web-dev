// Slugs come from the CMS, where they were free text until 2026-07. A slug
// holding a character that is reserved in a URL produces a link that renders
// fine in a listing but 404s when opened — the failure is invisible until a
// user clicks it.
//
// Encoding here fixes the cases that *can* round-trip (spaces, ?, #). It does
// NOT rescue `&`: Next cannot match a dynamic segment containing one, encoded
// or not. That case is prevented at the source by slugField() in the CMS repo
// (zun-cms/src/fields/slug.ts). This helper is the second layer, not the first.
export function tradingHref(slug: string): string {
  return `/trading/${encodeURIComponent(slug)}`
}

// Fragment identifiers on a static page — same reasoning, different target.
export function sectionHref(path: string, slug: string): string {
  return `${path}#${encodeURIComponent(slug)}`
}
