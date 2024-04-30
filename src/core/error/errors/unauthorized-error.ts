import { UseCaseErrors } from '../use-case-errors'

export class UnauthorizedError extends Error implements UseCaseErrors {
  constructor() {
    super('Unauthorized.')
  }
}
