import { GetObjectCommand } from '@aws-sdk/client-s3'
import { r2 } from '@/lib/r2'
import { th } from 'date-fns/locale'

export async function GET() {
  try {
    const params = {
      Bucket: process.env.R2_BUCKET_NAME || '',
      Key: 'sc-rate.json',
    }

    const command = new GetObjectCommand(params)
    const json = await r2.send(command)

    if (!json.Body) {
      throw new Error('sc-rate.json is not find.')
    }

    return new Response(json.Body?.transformToWebStream(), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.log(error)
  }
}
