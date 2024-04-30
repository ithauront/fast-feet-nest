import { Either } from '@/core/either';
import { CourierRepository } from '../repositories/courier-repository';
import { AdminRepository } from '../repositories/admin-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { HashComparer } from '../cryptography/hash-comparer';
import { Encrypter } from '../cryptography/encrypter';
interface AutenticateUseCaseRequest {
    cpf: string;
    password: string;
}
type AutenticateUseCaseResponse = Either<InvalidCredentialsError, {
    accessToken: string;
}>;
export declare class AutenticateUseCase {
    private courierRepository;
    private hashComparer;
    private encrypter;
    private adminRepository;
    constructor(courierRepository: CourierRepository, hashComparer: HashComparer, encrypter: Encrypter, adminRepository: AdminRepository);
    execute({ cpf, password, }: AutenticateUseCaseRequest): Promise<AutenticateUseCaseResponse>;
}
export {};
