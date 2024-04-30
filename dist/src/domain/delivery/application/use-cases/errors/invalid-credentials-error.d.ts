import { UseCaseErrors } from '@/core/error/use-case-errors';
export declare class InvalidCredentialsError extends Error implements UseCaseErrors {
    constructor();
}
