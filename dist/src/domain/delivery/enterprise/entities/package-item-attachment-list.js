"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageItemAttachmentList = void 0;
const watched_list_1 = require("../../../../core/entities/watched-list");
class PackageItemAttachmentList extends watched_list_1.WatchedList {
    compareItems(a, b) {
        return a.attachmentId.equals(b.attachmentId);
    }
}
exports.PackageItemAttachmentList = PackageItemAttachmentList;
//# sourceMappingURL=package-item-attachment-list.js.map