import { QueryParams } from '@/core/repositories/query-params'
import { RecipientRepository } from '@/domain/delivery/application/repositories/recipient-repository'
import { Recipient } from '@/domain/delivery/enterprise/entities/recipient'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaRecipientMapper } from '../mappers/prisma-recipient-mapper'

@Injectable()
export class PrismaRecipientRepository implements RecipientRepository {
  constructor(private prisma: PrismaService) {}

  async create(recipient: Recipient): Promise<void> {
    const data = PrismaRecipientMapper.toPrisma(recipient)
    await this.prisma.recipient.create({ data })
  }

  async findById(recipientId: string): Promise<Recipient | null> {
    const recipient = await this.prisma.recipient.findUnique({
      where: { id: recipientId },
    })
    if (!recipient) {
      return null
    }
    return PrismaRecipientMapper.toDomain(recipient)
  }

  async findByEmail(email: string): Promise<Recipient | null> {
    const recipient = await this.prisma.recipient.findUnique({
      where: { email },
    })
    if (!recipient) {
      return null
    }
    return PrismaRecipientMapper.toDomain(recipient)
  }

  async save(recipient: Recipient): Promise<void> {
    const data = PrismaRecipientMapper.toPrisma(recipient)
    await this.prisma.recipient.update({
      where: { id: data.id },
      data,
    })
  }

  async findMany({ page }: QueryParams): Promise<Recipient[]> {
    const recipients = await this.prisma.recipient.findMany({
      take: 20,
      skip: (page - 1) * 20,
    })
    return recipients.map(PrismaRecipientMapper.toDomain)
  }
}
