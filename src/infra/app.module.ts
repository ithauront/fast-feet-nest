import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateCourierController } from './controllers/courier-controllers/create-courier.controller'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { authModule } from './auth/auth.module'
import { AutenticateController } from './controllers/autentication.controller'
import { CreateAdminController } from './controllers/admin-controllers/create-admin.controller'
import { CreatePackageItemController } from './controllers/package-item-controllers/create-package-item.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    authModule
  ],
  controllers: [
    CreateCourierController,
    CreateAdminController,
    CreatePackageItemController,
    AutenticateController
  ],
  providers: [PrismaService],
})
export class AppModule { }
