import { NextRequest, NextResponse } from 'next/server'

const CMS_URL = process.env.CMS_URL || 'http://localhost:3001'

function isAllowedUrl(url: URL): boolean {
  const cmsHost = new URL(CMS_URL)
  if (url.hostname === cmsHost.hostname && url.port === cmsHost.port) return true
  if (url.hostname === 'admin-cms.zunkireelabs.com' && url.pathname.startsWith('/api/media/')) {
    return true
  }
  return false
}

function sanitizeFilename(name: string): string {
  return name.replace(/["\r\n]/g, '').trim() || 'brochure.pdf'
}

export async function GET(req: NextRequest) {
  const target = req.nextUrl.searchParams.get('url')
  const filename = sanitizeFilename(req.nextUrl.searchParams.get('filename') || 'brochure.pdf')

  if (!target) {
    return NextResponse.json({ error: 'Missing url' }, { status: 400 })
  }

  let parsed: URL
  try {
    parsed = new URL(target)
  } catch {
    return NextResponse.json({ error: 'Invalid url' }, { status: 400 })
  }

  if (!isAllowedUrl(parsed)) {
    return NextResponse.json({ error: 'URL not allowed' }, { status: 400 })
  }

  const upstream = await fetch(parsed.toString()).catch(() => null)
  if (!upstream || !upstream.ok || !upstream.body) {
    return NextResponse.json({ error: 'Failed to fetch file' }, { status: 502 })
  }

  return new NextResponse(upstream.body, {
    headers: {
      'Content-Type': upstream.headers.get('content-type') || 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
