import { Module } from '@nestjs/common'
import { r2Storage } from './r2-storage'
import { EnvModule } from '../env/env.module'
import { Uploader } from '@/domain/delivery/application/storage/uploader'

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: Uploader,
      useClass: r2Storage,
    },
  ],
  exports: [Uploader],
})
export class StorageModule {}
