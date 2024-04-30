import { WatchedList } from '@/core/entities/watched-list'
import { PackageItemAttachment } from './package-item-attachment'

export class PackageItemAttachmentList extends WatchedList<PackageItemAttachment> {
  compareItems(a: PackageItemAttachment, b: PackageItemAttachment): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}
