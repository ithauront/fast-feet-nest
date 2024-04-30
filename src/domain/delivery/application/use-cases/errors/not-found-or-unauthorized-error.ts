import { UseCaseErrors } from '@/core/error/use-case-errors'

export class NotFoundOrUnauthorizedError
  extends Error
  implements UseCaseErrors
{
  constructor() {
    super('Creator not found or not authorized.')
  }
}
