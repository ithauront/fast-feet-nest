import { UseCaseErrors } from '@/core/error/use-case-errors'

export class TokenExpiredError extends Error implements UseCaseErrors {
  constructor() {
    super('Token expired. Please create a new request')
  }
}
