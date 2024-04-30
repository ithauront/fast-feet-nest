"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllPackageItemsToAdminUseCase = void 0;
const either_1 = require("../../../../../core/either");
class ListAllPackageItemsToAdminUseCase {
    constructor(packageItemRepository, authorizationService) {
        this.packageItemRepository = packageItemRepository;
        this.authorizationService = authorizationService;
    }
    async execute({ creatorId, page, }) {
        const authorizationResult = await this.authorizationService.authorize(creatorId);
        if (authorizationResult?.isLeft()) {
            return (0, either_1.left)(authorizationResult.value);
        }
        const allPackageItems = await this.packageItemRepository.findManyByParams({
            page,
        });
        return (0, either_1.right)({ packageItems: allPackageItems });
    }
}
exports.ListAllPackageItemsToAdminUseCase = ListAllPackageItemsToAdminUseCase;
//# sourceMappingURL=list-all-package-items-to-admin.js.map