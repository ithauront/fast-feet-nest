import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  PackageItemAttachment,
  PackageItemAttachmentProps,
} from '@/domain/delivery/enterprise/entities/package-item-attachment'
import { makeAttachment } from './make-attachment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaPackageItemAttachmentMapper } from '@/infra/database/prisma/mappers/prisma-package-item-attachment-mapper'

const attachment = makeAttachment()
export function makePackageItemAttachments(
  override: Partial<PackageItemAttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const { createdAt, ...safeOverride } = override
  const packageItemAttachments = PackageItemAttachment.create(
    {
      attachment,
      packageItemId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...safeOverride,
      createdAt: createdAt ?? new Date(),
    },
    id,
  )

  return packageItemAttachments
}

@Injectable()
export class PackageItemAttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaPackageItemAttachment(
    data: Partial<PackageItemAttachmentProps>,
  ): Promise<PackageItemAttachment> {
    const packageItemAttachment = await this.prisma.attachment.update({
      where: { id: data.attachmentId?.toString() },
      data: {
        packageItemId: data.packageItemId?.toString(),
        isImmutable: data.isImmutable || false,
      },
    })

    return PrismaPackageItemAttachmentMapper.toDomain(packageItemAttachment)
  }
}
