import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const payload = await getPayload({ config })

    await payload.create({
      collection: 'enquiries',
      data: {
        name: body.name || '',
        phone: body.phone || '',
        email: body.email || '',
        service: body.service || body.intent || '',
        message: body.message || '',
      },
    })

    return Response.json({ ok: true })
  } catch {
    return Response.json({ ok: false }, { status: 500 })
  }
}
