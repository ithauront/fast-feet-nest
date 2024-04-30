import { UseCaseErrors } from '@/core/error/use-case-errors';
export declare class TokenExpiredError extends Error implements UseCaseErrors {
    constructor();
}
