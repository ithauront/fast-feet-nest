import { Module } from '@nestjs/common'
import { CreateCourierController } from './controllers/courier-controllers/create-courier.controller'
import { CreateAdminController } from './controllers/admin-controllers/create-admin.controller'
import { CreatePackageItemController } from './controllers/package-item-controllers/create-package-item.controller'
import { ListAllPackageItemsToAdminController } from './controllers/package-item-controllers/list-all-package-items-to-admin.controller'
import { AutenticateController } from './controllers/autentication.controller'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  controllers: [
    // courier controllers
    CreateCourierController,
    // admin controllers
    CreateAdminController,
    // package item controllers
    CreatePackageItemController,
    ListAllPackageItemsToAdminController,
    // other controllers
    AutenticateController,
  ],
  providers: [PrismaService],
})
export class HttpModule {}
