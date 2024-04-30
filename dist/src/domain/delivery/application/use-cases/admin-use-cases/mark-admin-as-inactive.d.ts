import { Either } from '@/core/either';
import { Admin } from '../../../enterprise/entities/admin';
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error';
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error';
import { UserNotFoundError } from '../errors/user-not-found-error';
import { AdminRepository } from '../../repositories/admin-repository';
import { AuthorizationService } from '../../services/authorization';
interface MarkAdminAsInactiveUseCaseRequest {
    creatorId: string;
    adminId: string;
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError;
type MarkAdminAsInactiveUseCaseResponse = Either<AuthorizationError | UserNotFoundError, Admin>;
export declare class MarkAdminAsInactiveUseCase {
    private adminRepository;
    private authorizationService;
    constructor(adminRepository: AdminRepository, authorizationService: AuthorizationService);
    execute({ creatorId, adminId, }: MarkAdminAsInactiveUseCaseRequest): Promise<MarkAdminAsInactiveUseCaseResponse>;
}
export {};
