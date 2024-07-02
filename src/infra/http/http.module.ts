import { Module } from '@nestjs/common'
import { HttpModule as NestHttpModule } from '@nestjs/axios'
import { RegisterCourierController } from './controllers/courier-controllers/register-courier.controller'
import { RegisterAdminController } from './controllers/admin-controllers/register-admin.controller'
import { CreatePackageItemController } from './controllers/package-item-controllers/create-package-item.controller'
import { ListAllPackageItemsToAdminController } from './controllers/package-item-controllers/list-all-package-items-to-admin.controller'
import { AutenticateController } from './controllers/autentication.controller'
import { DatabaseModule } from '../database/database.module'
import { CreatePackageItemUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/create-package-item'
import { GetPackageItemByIdUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/get-package-item-by-id'
import { AuthorizationService } from '@/domain/delivery/application/services/authorization'
import { ListAllPackageItemsToAdminUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/list-all-package-items-to-admin'
import { AutenticateUseCase } from '@/domain/delivery/application/use-cases/autenticate'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { RegisterCourierUseCase } from '@/domain/delivery/application/use-cases/courier-use-cases/register-courier'
import { RegisterAdminUseCase } from '@/domain/delivery/application/use-cases/admin-use-cases/register-admin'
import { AlterPackageItemStatusController } from './controllers/package-item-controllers/alter-package-item-status.controller'
import { MarkPackageItemAsInTransitUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/mark-package-item-as-in-transit'
import { MarkPackageItemAsReturnedUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/mark-package-item-as-returned'
import { MarkPackageItemAsLostUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/mark-package-item-as-lost'
import { MarkPackageItemAsDeliveredUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/mark-package-item-as-delivered'
import { GetPackageItemByIdController } from './controllers/package-item-controllers/get-package-item-by-id.controller'
import { AlterCourierStatusController } from './controllers/courier-controllers/alter-courier-status.controller'
import { MarkCourierAsActiveUseCase } from '@/domain/delivery/application/use-cases/courier-use-cases/mark-courier-as-active'
import { MarkCourierAsDismissedUseCase } from '@/domain/delivery/application/use-cases/courier-use-cases/mark-courier-as-dismissed'
import { MarkCourierAsInactiveUseCase } from '@/domain/delivery/application/use-cases/courier-use-cases/mark-courier-as-inactive'
import { MarkCourierAsOnVacationUseCase } from '@/domain/delivery/application/use-cases/courier-use-cases/mark-courier-as-on-vacation'
import { AlterAdminStatusController } from './controllers/admin-controllers/alter-admin-status.controller'
import { MarkAdminAsActiveUseCase } from '@/domain/delivery/application/use-cases/admin-use-cases/mark-admin-as-active'
import { MarkAdminAsInactiveUseCase } from '@/domain/delivery/application/use-cases/admin-use-cases/mark-admin-as-inactive'
import { ListAdminController } from './controllers/admin-controllers/list-admin.controller'
import { ListAdminUseCase } from '@/domain/delivery/application/use-cases/admin-use-cases/list-admin'
import { ListCourierUseCase } from '@/domain/delivery/application/use-cases/courier-use-cases/list-courier'
import { ListCourierController } from './controllers/courier-controllers/list-courier.controller'
import { ChangeCourierPhoneController } from './controllers/courier-controllers/change-courier-phone.controller'
import { ChangeCourierPhoneUseCase } from '@/domain/delivery/application/use-cases/courier-use-cases/change-courier-phone'
import { AlterCourierIsAdminController } from './controllers/courier-controllers/alter-courier-isAdmin.controller'
import { GrantAdminStatusToCourierUseCase } from '@/domain/delivery/application/use-cases/courier-use-cases/grant-admin-status-to-courier'
import { RevokeAdminStatusToCourierUseCase } from '@/domain/delivery/application/use-cases/courier-use-cases/revoke-admin-status-to-courier'
import { SetCourierLocationUseCase } from '@/domain/delivery/application/use-cases/courier-use-cases/set-courier-location'
import { SetCourierLocationController } from './controllers/courier-controllers/set-courier-location.controller'
import { InfraGeoLocationProvider } from './services/infra-geo-location-provider'
import { GeoLocationProvider } from '@/domain/delivery/application/services/geo-locationProvider'
import { RegisterRecipientController } from './controllers/recipient-controllers/register-recipient.controller'
import { RegisterRecipientUseCase } from '@/domain/delivery/application/use-cases/recipient-use-cases/register-recipient'
import { ListRecipientsController } from './controllers/recipient-controllers/list-recipients.controller'
import { ListRecipientsUseCase } from '@/domain/delivery/application/use-cases/recipient-use-cases/list-recipients'
import { GetRecipientEmailUseCase } from '@/domain/delivery/application/use-cases/recipient-use-cases/get-recipient-by-email'
import { GetRecipientByEmailController } from './controllers/recipient-controllers/get-recipient-by-email.controller'
import { ChangeRecipientEmailController } from './controllers/recipient-controllers/change-recipient-email.controller'
import { ChangeRecipientEmailUseCase } from '@/domain/delivery/application/use-cases/recipient-use-cases/change-recipient-email'
import { ChangeRecipientAddressUseCase } from '@/domain/delivery/application/use-cases/recipient-use-cases/change-recipient-address'
import { ChangeRecipientAddressController } from './controllers/recipient-controllers/change-recipient-address.controller'
import { ListAllPackageItemsWithoutCourierToAdminUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/list-unassigned-package-items-to-admin'
import { ListUnassignedPackageItemsToAdminController } from './controllers/package-item-controllers/list-unassigned-package-items.controller'
import { ListReturnedPackageItemToAdminUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/list-returned-package-items-to-admin'
import { ListReturnedPackageItemsToAdminController } from './controllers/package-item-controllers/list-returned-package-item.controller'
import { ListLostPackageItemsToAdminController } from './controllers/package-item-controllers/list-lost-package-item.controller'
import { ListLostPackageItemToAdminUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/list-lost-package-items-to-admin'

@Module({
  imports: [DatabaseModule, CryptographyModule, NestHttpModule],
  controllers: [
    // admin controllers
    RegisterAdminController,
    AlterAdminStatusController,
    ListAdminController,
    // courier controllers
    RegisterCourierController,
    AlterCourierStatusController,
    ListCourierController,
    ChangeCourierPhoneController,
    AlterCourierIsAdminController,
    SetCourierLocationController,
    // package item controllers
    CreatePackageItemController,
    ListAllPackageItemsToAdminController,
    GetPackageItemByIdController,
    AlterPackageItemStatusController,
    ListUnassignedPackageItemsToAdminController,
    ListReturnedPackageItemsToAdminController,
    ListLostPackageItemsToAdminController,

    // recipient controllers
    RegisterRecipientController,
    ListRecipientsController,
    GetRecipientByEmailController,
    ChangeRecipientEmailController,
    ChangeRecipientAddressController,

    // other controllers
    AutenticateController,
  ],
  providers: [
    // admin useCases
    RegisterAdminUseCase,
    MarkAdminAsActiveUseCase,
    MarkAdminAsInactiveUseCase,
    ListAdminUseCase,

    // courier useCases
    RegisterCourierUseCase,
    MarkCourierAsActiveUseCase,
    MarkCourierAsDismissedUseCase,
    MarkCourierAsInactiveUseCase,
    MarkCourierAsOnVacationUseCase,
    ListCourierUseCase,
    ChangeCourierPhoneUseCase,
    GrantAdminStatusToCourierUseCase,
    RevokeAdminStatusToCourierUseCase,
    SetCourierLocationUseCase,

    // package item useCases
    CreatePackageItemUseCase,
    GetPackageItemByIdUseCase,
    ListAllPackageItemsToAdminUseCase,
    MarkPackageItemAsInTransitUseCase,
    MarkPackageItemAsReturnedUseCase,
    MarkPackageItemAsLostUseCase,
    MarkPackageItemAsDeliveredUseCase,
    ListAllPackageItemsWithoutCourierToAdminUseCase,
    ListReturnedPackageItemToAdminUseCase,
    ListLostPackageItemToAdminUseCase,

    // recipient useCases
    RegisterRecipientUseCase,
    ListRecipientsUseCase,
    GetRecipientEmailUseCase,
    ChangeRecipientEmailUseCase,
    ChangeRecipientAddressUseCase,

    // others
    AutenticateUseCase,
    AuthorizationService,
    {
      provide: GeoLocationProvider,
      useClass: InfraGeoLocationProvider,
    },
  ],
})
export class HttpModule {}
