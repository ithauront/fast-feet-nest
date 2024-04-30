import { Either } from '@/core/either';
import { CourierRepository } from '../repositories/courier-repository';
import { AdminRepository } from '../repositories/admin-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { HashGenerator } from '../cryptography/hash-generator';
import { Encrypter } from '../cryptography/encrypter';
import { TokenExpiredError } from './errors/token-expired-error';
interface ChangePasswordUseCaseRequest {
    uniqueAccessToken: string;
    newPassword: string;
}
type ChangePasswordUseCaseResponse = Either<InvalidCredentialsError | TokenExpiredError, {
    message: string;
}>;
export declare class ChangePasswordUseCase {
    private courierRepository;
    private adminRepository;
    private encrypter;
    private hashGenerator;
    constructor(courierRepository: CourierRepository, adminRepository: AdminRepository, encrypter: Encrypter, hashGenerator: HashGenerator);
    execute({ uniqueAccessToken, newPassword, }: ChangePasswordUseCaseRequest): Promise<ChangePasswordUseCaseResponse>;
}
export {};
