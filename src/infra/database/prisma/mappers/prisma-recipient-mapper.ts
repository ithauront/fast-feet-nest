import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Recipient } from '@/domain/delivery/enterprise/entities/recipient'
import { Prisma, Recipient as PrismaRecipient } from '@prisma/client'

export class PrismaRecipientMapper {
  static toDomain(raw: PrismaRecipient): Recipient {
    return Recipient.create(
      {
        name: raw.name,
        email: raw.email,
        address: raw.address,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(recipient: Recipient): Prisma.RecipientUncheckedCreateInput {
    return {
      id: recipient.id.toString(),
      name: recipient.name,
      email: recipient.email,
      address: recipient.address,
      createdAt: recipient.createdAt,
      updatedAt: recipient.updatedAt,
    }
  }
}
