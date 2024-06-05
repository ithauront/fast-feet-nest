import { AdminRepository } from '../repositories/admin-repository';
import { CourierRepository } from '../repositories/courier-repository';
import { UnauthorizedAdminError } from '../use-cases/errors/unauthorized-admin-error';
export declare class AuthorizationService {
    private courierRepository;
    private adminRepository;
    constructor(courierRepository: CourierRepository, adminRepository: AdminRepository);
    authorize(creatorId: string): Promise<import("@/core/either").Left<UnauthorizedAdminError, unknown> | import("@/core/either").Right<UnauthorizedAdminError, unknown> | undefined>;
}
