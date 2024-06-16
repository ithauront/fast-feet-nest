import { QueryParams } from '@/core/repositories/query-params'
import { CourierRepository } from '@/domain/delivery/application/repositories/courier-repository'
import { Courier } from '@/domain/delivery/enterprise/entities/courier'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaCourierMapper } from '../mappers/prisma-courier-mapper'
import { CourierStatus } from '@prisma/client'

@Injectable()
export class PrismaCourierRepository implements CourierRepository {
  constructor(private prisma: PrismaService) {}

  async create(courier: Courier): Promise<void> {
    const data = PrismaCourierMapper.toPrisma(courier)
    await this.prisma.courier.create({ data })
  }

  async findById(courierId: string): Promise<Courier | null> {
    const courier = await this.prisma.courier.findUnique({
      where: { id: courierId },
    })
    if (!courier) {
      return null
    }
    return PrismaCourierMapper.toDomain(courier)
  }

  async findByEmail(email: string): Promise<Courier | null> {
    const courier = await this.prisma.courier.findUnique({
      where: { email },
    })
    if (!courier) {
      return null
    }
    return PrismaCourierMapper.toDomain(courier)
  }

  async findByCpf(cpf: string): Promise<Courier | null> {
    const courier = await this.prisma.courier.findUnique({
      where: { cpf },
    })
    if (!courier) {
      return null
    }
    return PrismaCourierMapper.toDomain(courier)
  }

  async save(courier: Courier): Promise<void> {
    const data = PrismaCourierMapper.toPrisma(courier)
    await this.prisma.courier.update({
      where: { id: data.id },
      data,
    })
  }

  async findMany({ page, address, status }: QueryParams): Promise<Courier[]> {
    const where = {
      ...(status && { status: CourierStatus[status] }),
      ...(address && { deliveryAddress: address }),
    }
    const couriers = await this.prisma.courier.findMany({
      where,
      take: 20,
      skip: (page - 1) * 20,
    })
    return couriers.map(PrismaCourierMapper.toDomain)
  }
}
