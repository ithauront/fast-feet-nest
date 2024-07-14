import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Email } from '@/domain/notification/enterprise/entities/email'
import { Email as PrismaEmail, Prisma } from '@prisma/client'

export class PrismaEmailMapper {
  static toDomain(raw: PrismaEmail): Email {
    return Email.create(
      {
        subject: raw.subject,
        body: raw.body,
        recipientEmail: raw.recipientEmail,
        createdAt: raw.createdAt,
        sentAt: raw.sentAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(email: Email): Prisma.EmailUncheckedCreateInput {
    return {
      id: email.id.toString(),
      recipientEmail: email.recipientEmail,
      subject: email.subject,
      body: email.body,
      createdAt: email.createdAt,
      sentAt: email.sentAt,
    }
  }
}
