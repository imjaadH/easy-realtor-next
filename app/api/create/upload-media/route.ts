import { NextRequest, NextResponse } from 'next/server'
import { Upload } from '@aws-sdk/lib-storage'

import s3 from '@/lib/aws'
import { Readable } from 'stream'

const Bucket = 'easyrealtor'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const files = formData.getAll('file') as File[]
  const path = formData.get('path') as string

  try {
    const response = await Promise.all(
      files.map(async file => {
        const fileStream = Readable.from(file.stream() as any)

        const uploadTos3 = new Upload({
          client: s3,
          params: {
            Bucket,
            Key: `${path}${file.name}`,
            Body: fileStream,
          },
        })
        const res = await uploadTos3.done()
        return res.Location
      }),
    )

    return NextResponse.json(response)
  } catch (error) {
    NextResponse.json(
      { message: 'Error uploading image to s3.' },
      { status: 500 },
    )
  }
}
