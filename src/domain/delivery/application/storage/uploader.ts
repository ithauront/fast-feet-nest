export interface UploaderParams {
  fileType: string
  fileName: string
  body: Buffer
}
export abstract class Uploader {
  abstract upload(params: UploaderParams): Promise<{ url: string }>
}
