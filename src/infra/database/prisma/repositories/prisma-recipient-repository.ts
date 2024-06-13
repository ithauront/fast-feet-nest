import { QueryParams } from '@/core/repositories/query-params'
import { RecipientRepository } from '@/domain/delivery/application/repositories/recipient-repository'
import { Recipient } from '@/domain/delivery/enterprise/entities/recipient'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaRecipientRepository implements RecipientRepository {
  constructor(private prisma: PrismaService) {}

  create(recipient: Recipient): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findById(recipientId: string): Promise<any> {
    throw new Error('Method not implemented.')
  }

  findByEmail(email: string): Promise<any> {
    throw new Error('Method not implemented.')
  }

  save(recipient: Recipient): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findMany(params: QueryParams): Promise<Recipient[]> {
    throw new Error('Method not implemented.')
  }
}
