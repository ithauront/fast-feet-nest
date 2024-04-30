import { UseCaseErrors } from '@/core/error/use-case-errors'

export class InvalidCredentialsError extends Error implements UseCaseErrors {
  constructor() {
    super('Invalid Credentials.')
  }
}
