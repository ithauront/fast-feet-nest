import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makePackageItemAttachments } from './make-package-item-attachment'

describe('makePackageItemAttachments', () => {
  test('should correctly assign isImmutable when provided', () => {
    const attachment = makePackageItemAttachments({
      packageItemId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      isImmutable: true,
    })

    expect(attachment.isImmutable).toBe(true)
  })

  test('should default isImmutable to false when not provided', () => {
    const attachment = makePackageItemAttachments({
      packageItemId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
    })

    expect(attachment.isImmutable).toBe(false)
  })
})
