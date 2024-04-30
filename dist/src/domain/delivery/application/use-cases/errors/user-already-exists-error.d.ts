import { UseCaseErrors } from '@/core/error/use-case-errors';
export declare class UserAlreadyExistsError extends Error implements UseCaseErrors {
    constructor(message?: string);
}
