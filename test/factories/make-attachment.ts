import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import {
  Attachment,
  AttachmentProps,
} from '@/domain/delivery/enterprise/entities/attachment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaAttachmentMapper } from '@/infra/database/prisma/mappers/prisma-attachment-mapper'

export function makeAttachment(
  override: Partial<AttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const attachment = Attachment.create(
    {
      title: faker.lorem.slug(),
      link: faker.lorem.slug(),
      ...override,
    },
    id,
  )

  return attachment
}
@Injectable()
export class AttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAttachment(
    data: Partial<AttachmentProps> = {},
    isImmutable: boolean,
  ): Promise<Attachment> {
    const attachment = makeAttachment(data)

    await this.prisma.attachment.create({
      data: PrismaAttachmentMapper.toPrisma(attachment, null, isImmutable),
    })

    return attachment
  }
}
