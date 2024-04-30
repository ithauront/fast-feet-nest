import { Either } from '@/core/either';
import { Admin } from '../../../enterprise/entities/admin';
import { AdminRepository } from '../../repositories/admin-repository';
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error';
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error';
import { AuthorizationService } from '../../services/authorization';
interface ListAdminUseCaseRequest {
    page: number;
    creatorId: string;
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError;
type ListAdminUseCaseResponse = Either<AuthorizationError, {
    admin: Admin[];
}>;
export declare class ListAdminUseCase {
    private adminRepository;
    private authorizationService;
    constructor(adminRepository: AdminRepository, authorizationService: AuthorizationService);
    execute({ creatorId, page, }: ListAdminUseCaseRequest): Promise<ListAdminUseCaseResponse>;
}
export {};
