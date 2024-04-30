import { UseCaseErrors } from '@/core/error/use-case-errors';
export declare class NotFoundOrUnauthorizedError extends Error implements UseCaseErrors {
    constructor();
}
