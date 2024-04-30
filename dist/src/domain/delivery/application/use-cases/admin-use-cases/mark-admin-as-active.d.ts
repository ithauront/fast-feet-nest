import { Either } from '@/core/either';
import { Admin } from '@/domain/delivery/enterprise/entities/admin';
import { AdminRepository } from '../../repositories/admin-repository';
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error';
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error';
import { UserNotFoundError } from '../errors/user-not-found-error';
import { InvalidActionError } from '../errors/invalid-action-error';
import { AuthorizationService } from '../../services/authorization';
interface MarkAdminAsActiveUseCaseRequest {
    creatorId: string;
    adminId: string;
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError;
type MarkAdminAsActiveUseCaseResponse = Either<AuthorizationError | UserNotFoundError | InvalidActionError, Admin>;
export declare class MarkAdminAsActiveUseCase {
    private adminRepository;
    private authorizationService;
    constructor(adminRepository: AdminRepository, authorizationService: AuthorizationService);
    execute({ creatorId, adminId, }: MarkAdminAsActiveUseCaseRequest): Promise<MarkAdminAsActiveUseCaseResponse>;
}
export {};
