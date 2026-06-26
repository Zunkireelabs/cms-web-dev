import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const secret = authHeader?.replace('Bearer ', '')
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const collection = body.collection as string | undefined

  if (collection) {
    revalidateTag(collection)
  } else {
    // revalidate everything
    const tags = ['projects', 'brands', 'product-domains', 'leadership', 'ventures', 'events', 'testimonials', 'certifications', 'milestones', 'globals/site-config']
    tags.forEach(revalidateTag)
  }

  return NextResponse.json({ revalidated: true, collection: collection ?? 'all' })
}
