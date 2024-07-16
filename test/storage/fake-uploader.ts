import {
  Uploader,
  UploaderParams,
} from '@/domain/delivery/application/storage/uploader'
import { randomUUID } from 'crypto'

interface Upload {
  fileName: string
  url: string
}

export class FakeUploader implements Uploader {
  public uploads: Upload[] = []
  async upload({ fileName }: UploaderParams): Promise<{ url: string }> {
    const url = randomUUID()

    await this.uploads.push({
      fileName,
      url,
    })
    return { url }
  }
}