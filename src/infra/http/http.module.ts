import { Module } from '@nestjs/common'
import { CreateCourierController } from './controllers/courier-controllers/create-courier.controller'
import { CreateAdminController } from './controllers/admin-controllers/create-admin.controller'
import { CreatePackageItemController } from './controllers/package-item-controllers/create-package-item.controller'
import { ListAllPackageItemsToAdminController } from './controllers/package-item-controllers/list-all-package-items-to-admin.controller'
import { AutenticateController } from './controllers/autentication.controller'
import { DatabaseModule } from '../database/database.module'
import { CreatePackageItemUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/create-package-item'
import { GetPackageItemByIdUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/get-package-item-by-id'
import { AuthorizationService } from '@/domain/delivery/application/services/authorization'
import { GetPackageItemByIdController } from './controllers/package-item-controllers/get-package-item-by-id-controller'
import { ListAllPackageItemsToAdminUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/list-all-package-items-to-admin'

@Module({
  imports: [DatabaseModule],
  controllers: [
    // courier controllers
    CreateCourierController,
    // admin controllers
    CreateAdminController,
    // package item controllers
    CreatePackageItemController,
    ListAllPackageItemsToAdminController,
    GetPackageItemByIdController,
    // other controllers
    AutenticateController,
  ],
  providers: [
    CreatePackageItemUseCase,
    GetPackageItemByIdUseCase,
    ListAllPackageItemsToAdminUseCase,
    AuthorizationService,
  ],
})
export class HttpModule {}
