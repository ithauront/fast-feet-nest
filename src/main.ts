import { NestFactory } from '@nestjs/core'
import { AppModule } from './infra/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false })
  await app.listen(3353)
}
bootstrap()
