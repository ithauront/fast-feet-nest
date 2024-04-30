import { UseCaseErrors } from '@/core/error/use-case-errors';
export declare class UnauthorizedAdminError extends Error implements UseCaseErrors {
    constructor(message?: string);
}
