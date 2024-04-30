"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCourierPackageItemUseCase = void 0;
const either_1 = require("../../../../../core/either");
class ListCourierPackageItemUseCase {
    constructor(packageItemRepository, authorizationService) {
        this.packageItemRepository = packageItemRepository;
        this.authorizationService = authorizationService;
    }
    async execute({ creatorId, courierId, page, }) {
        if (courierId !== creatorId) {
            const authorizationResult = await this.authorizationService.authorize(creatorId);
            if (authorizationResult?.isLeft()) {
                return (0, either_1.left)(authorizationResult.value);
            }
        }
        const queryParams = {
            page,
        };
        const courierPackageItems = await this.packageItemRepository.findManyByParamsAndCourierId(queryParams, courierId);
        return (0, either_1.right)({ packageItems: courierPackageItems });
    }
}
exports.ListCourierPackageItemUseCase = ListCourierPackageItemUseCase;
//# sourceMappingURL=list-courier-package-items.js.map