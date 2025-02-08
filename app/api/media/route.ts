import { NextResponse } from 'next/server'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import s3 from '@/lib/aws'

const Bucket = 'easyrealtor'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const key = searchParams.get('key')

  if (!key) {
    return NextResponse.json({ error: 'Missing key' }, { status: 400 })
  }

  const command = new GetObjectCommand({
    Bucket,
    Key: key,
  })

  try {
    const { Body, ContentType } = await s3.send(command)
    return new Response(Body as any, {
      headers: { 'Content-Type': ContentType || 'image/png' },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 },
    )
  }
}
