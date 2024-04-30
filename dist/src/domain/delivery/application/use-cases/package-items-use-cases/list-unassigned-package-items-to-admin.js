"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllPackageItemsWithoutCourierToAdminUseCase = void 0;
const either_1 = require("../../../../../core/either");
class ListAllPackageItemsWithoutCourierToAdminUseCase {
    constructor(packageItemRepository, authorizationService) {
        this.packageItemRepository = packageItemRepository;
        this.authorizationService = authorizationService;
    }
    async execute({ creatorId, page, }) {
        const authorizationResult = await this.authorizationService.authorize(creatorId);
        if (authorizationResult?.isLeft()) {
            return (0, either_1.left)(authorizationResult.value);
        }
        const queryParams = {
            page,
        };
        const allPackageItemsWithoutCourier = await this.packageItemRepository.findManyByParamsAndCourierId(queryParams, null);
        return (0, either_1.right)({ packageItems: allPackageItemsWithoutCourier });
    }
}
exports.ListAllPackageItemsWithoutCourierToAdminUseCase = ListAllPackageItemsWithoutCourierToAdminUseCase;
//# sourceMappingURL=list-unassigned-package-items-to-admin.js.map