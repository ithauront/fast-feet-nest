import { EmailRepository } from '@/domain/notification/application/repositories/email-repository'
import { PrismaService } from '../prisma.service'
import { Email } from '@/domain/notification/enterprise/entities/email'
import { PrismaEmailMapper } from '../mappers/prisma-email-mapper'

export class PrismaEmailRepository implements EmailRepository {
  constructor(private prisma: PrismaService) {}
  async findById(id: string): Promise<Email | null> {
    const email = await this.prisma.email.findFirst({
      where: { id },
    })

    if (!email) {
      return null
    }
    return PrismaEmailMapper.toDomain(email)
  }

  async create(email: Email): Promise<void> {
    const data = PrismaEmailMapper.toPrisma(email)
    await this.prisma.email.create({
      data,
    })
  }

  async save(email: Email): Promise<void> {
    const data = PrismaEmailMapper.toPrisma(email)

    await this.prisma.email.update({
      where: { id: data.id },
      data,
    })
  }
}
