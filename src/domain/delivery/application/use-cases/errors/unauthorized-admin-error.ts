import { UseCaseErrors } from '@/core/error/use-case-errors'

export class UnauthorizedAdminError extends Error implements UseCaseErrors {
  constructor(
    message: string = 'This action is only allowed to active admins',
  ) {
    super(message)
  }
}
