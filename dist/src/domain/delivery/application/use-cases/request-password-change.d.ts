import { Either } from '@/core/either';
import { CourierRepository } from '../repositories/courier-repository';
import { AdminRepository } from '../repositories/admin-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { Encrypter } from '../cryptography/encrypter';
interface RequestPasswordChangeUseCaseRequest {
    creatorId: string;
    userEmail: string;
}
type RequestPasswordChangeUseCaseResponse = Either<InvalidCredentialsError, {
    message: string;
}>;
export declare class RequestPasswordChangeUseCase {
    private courierRepository;
    private adminRepository;
    private encrypter;
    constructor(courierRepository: CourierRepository, adminRepository: AdminRepository, encrypter: Encrypter);
    execute({ creatorId, userEmail, }: RequestPasswordChangeUseCaseRequest): Promise<RequestPasswordChangeUseCaseResponse>;
}
export {};
