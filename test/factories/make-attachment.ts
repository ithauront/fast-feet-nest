import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import {
  Attachment,
  AttachmentProps,
} from '@/domain/delivery/enterprise/entities/attachment'

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
