import { UseCaseErrors } from '../use-case-errors'

export class ResourceNotFoundError extends Error implements UseCaseErrors {
  constructor() {
    super('Resource not found.')
  }
}
