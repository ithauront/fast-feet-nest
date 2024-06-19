import { left } from '@/core/either'
import { AdminRepository } from '../repositories/admin-repository'
import { CourierRepository } from '../repositories/courier-repository'
import { UnauthorizedAdminError } from '../use-cases/errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../use-cases/errors/not-found-or-unauthorized-error'
import { CourierStatus } from '../../enterprise/entities/courier'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthorizationService {
  constructor(
    private courierRepository: CourierRepository,
    private adminRepository: AdminRepository,
  ) {}

  async authorize(creatorId: string) {
    const admin = await this.adminRepository.findById(creatorId)

    if (admin) {
      if (!admin.isActive) {
        return left(new UnauthorizedAdminError())
      }
      return
    }

    const courier = await this.courierRepository.findById(creatorId)
    if (courier) {
      if (!courier.isAdmin) {
        return left(new UnauthorizedAdminError())
      }
      if (
        courier.status !== CourierStatus.ACTIVE &&
        courier.status !== CourierStatus.ON_VACATION
      ) {
        return left(new UnauthorizedAdminError())
      }
      return
    }
    return left(new NotFoundOrUnauthorizedError())
  }
}
