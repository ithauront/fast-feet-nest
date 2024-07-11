import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import {
  Uploader,
  UploaderParams,
} from '@/domain/delivery/application/storage/uploader'
import { EnvService } from '../env/env.service'
import { randomUUID } from 'crypto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class r2Storage implements Uploader {
  private client: S3Client
  constructor(private envService: EnvService) {
    const acountId = envService.get('CLOUDFLARE_ID')
    this.client = new S3Client({
      endpoint: `https://${acountId}.r2.cloudflarestorage.com`,
      region: 'auto',
      credentials: {
        accessKeyId: envService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: envService.get('AWS_SECRET_KEY_ID'),
      },
    })
  }

  async upload({
    fileName,
    fileType,
    body,
  }: UploaderParams): Promise<{ url: string }> {
    const uploadId = randomUUID()
    const uniqueFileName = `${uploadId}-${fileName}`
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.envService.get('AWS_BUCKET_NAME'),
        Key: uniqueFileName,
        ContentType: fileType,
        Body: body,
      }),
    )
    return {
      url: uniqueFileName,
    }
  }
}
