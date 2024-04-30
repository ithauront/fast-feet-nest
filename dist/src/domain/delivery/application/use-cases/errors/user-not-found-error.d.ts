import { UseCaseErrors } from '@/core/error/use-case-errors';
export declare class UserNotFoundError extends Error implements UseCaseErrors {
    constructor(message?: string);
}
