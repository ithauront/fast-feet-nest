import { UseCaseErrors } from '@/core/error/use-case-errors'

export class UserAlreadyExistsError extends Error implements UseCaseErrors {
  constructor(message: string = 'User already exists') {
    super(message)
  }
}
