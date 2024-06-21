import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Courier,
  CourierStatus,
} from '@/domain/delivery/enterprise/entities/courier'
import { GeoLocation } from '@/domain/delivery/enterprise/entities/value-object/geolocation'
import { Prisma, Courier as PrismaCourier } from '@prisma/client'

export class PrismaCourierMapper {
  static toDomain(raw: PrismaCourier): Courier {
    const location =
      raw.latitude !== null && raw.longitude !== null
        ? new GeoLocation(raw.latitude, raw.longitude)
        : null

    return Courier.create(
      {
        name: raw.name,
        cpf: raw.cpf,
        email: raw.email,
        password: raw.password,
        phone: raw.phone,
        location,
        isAdmin: raw.isAdmin,
        status: CourierStatus[raw.status as keyof typeof CourierStatus],
        updatedAt: raw.updatedAt,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(courier: Courier): Prisma.CourierUncheckedCreateInput {
    return {
      id: courier.id.toString(),
      name: courier.name,
      cpf: courier.cpf,
      email: courier.email,
      password: courier.props.password,
      phone: courier.phone,
      isAdmin: courier.isAdmin,
      status: courier.status,
      latitude: courier.location?.latitude,
      longitude: courier.location?.longitude,
      createdAt: courier.createdAt,
      updatedAt: courier.updatedAt,
    }
  }
}
