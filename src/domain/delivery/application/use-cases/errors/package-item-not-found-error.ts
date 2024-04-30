import { UseCaseErrors } from '@/core/error/use-case-errors'

export class PackageItemNotFoundError extends Error implements UseCaseErrors {
  constructor(message: string = 'Package item not found.') {
    super(message)
  }
}
