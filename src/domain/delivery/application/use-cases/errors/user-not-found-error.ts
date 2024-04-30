import { UseCaseErrors } from '@/core/error/use-case-errors'

export class UserNotFoundError extends Error implements UseCaseErrors {
  constructor(message: string = 'User not found.') {
    super(message)
  }
}
