import { UseCaseErrors } from '@/core/error/use-case-errors'

export class InvalidActionError extends Error implements UseCaseErrors {
  constructor(message: string = 'This action cannot be done') {
    super(message)
  }
}
