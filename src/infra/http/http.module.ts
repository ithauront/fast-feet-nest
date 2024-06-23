import { Module } from '@nestjs/common'
import { RegisterCourierController } from './controllers/courier-controllers/register-courier.controller'
import { RegisterAdminController } from './controllers/admin-controllers/register-admin.controller'
import { CreatePackageItemController } from './controllers/package-item-controllers/create-package-item.controller'
import { ListAllPackageItemsToAdminController } from './controllers/package-item-controllers/list-all-package-items-to-admin.controller'
import { AutenticateController } from './controllers/autentication.controller'
import { DatabaseModule } from '../database/database.module'
import { CreatePackageItemUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/create-package-item'
import { GetPackageItemByIdUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/get-package-item-by-id'
import { AuthorizationService } from '@/domain/delivery/application/services/authorization'
import { GetPackageItemByIdController } from './controllers/package-item-controllers/get-package-item-by-id-controller'
import { ListAllPackageItemsToAdminUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/list-all-package-items-to-admin'
import { AutenticateUseCase } from '@/domain/delivery/application/use-cases/autenticate'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { RegisterCourierUseCase } from '@/domain/delivery/application/use-cases/courier-use-cases/register-courier'
import { RegisterAdminUseCase } from '@/domain/delivery/application/use-cases/admin-use-cases/register-admin'
import { AlterPackageItemStatusController } from './controllers/package-item-controllers/alter-package-item-status-controller'
import { MarkPackageItemAsInTransitUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/mark-package-item-as-in-transit'
import { MarkPackageItemAsReturnedUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/mark-package-item-as-returned'
import { MarkPackageItemAsLostUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/mark-package-item-as-lost'
import { MarkPackageItemAsDeliveredUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/mark-package-item-as-delivered'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    // courier controllers
    RegisterCourierController,
    // admin controllers
    RegisterAdminController,
    // package item controllers
    CreatePackageItemController,
    ListAllPackageItemsToAdminController,
    GetPackageItemByIdController,
    AlterPackageItemStatusController,
    // other controllers
    AutenticateController,
  ],
  providers: [
    // admin useCases
    RegisterAdminUseCase,
    // courier useCases
    RegisterCourierUseCase,
    // package item useCases
    CreatePackageItemUseCase,
    GetPackageItemByIdUseCase,
    ListAllPackageItemsToAdminUseCase,
    MarkPackageItemAsInTransitUseCase,
    MarkPackageItemAsReturnedUseCase,
    MarkPackageItemAsLostUseCase,
    MarkPackageItemAsDeliveredUseCase,

    // others
    AutenticateUseCase,
    AuthorizationService,
  ],
})
export class HttpModule {}
