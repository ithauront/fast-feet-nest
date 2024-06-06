import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateCourierController } from './controllers/create-courier.controller'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { authModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    authModule
  ],
  controllers: [CreateCourierController,],
  providers: [PrismaService],
})
export class AppModule { }
