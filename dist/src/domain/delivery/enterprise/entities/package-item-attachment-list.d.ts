import { WatchedList } from '@/core/entities/watched-list';
import { PackageItemAttachment } from './package-item-attachment';
export declare class PackageItemAttachmentList extends WatchedList<PackageItemAttachment> {
    compareItems(a: PackageItemAttachment, b: PackageItemAttachment): boolean;
}
