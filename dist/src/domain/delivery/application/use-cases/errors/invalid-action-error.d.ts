import { UseCaseErrors } from '@/core/error/use-case-errors';
export declare class InvalidActionError extends Error implements UseCaseErrors {
    constructor(message?: string);
}
