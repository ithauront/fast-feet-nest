import { UseCaseErrors } from '@/core/error/use-case-errors';
export declare class PackageItemNotFoundError extends Error implements UseCaseErrors {
    constructor(message?: string);
}
