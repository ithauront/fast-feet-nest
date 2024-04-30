import { InMemoryAdminRepository } from '../../../../../../test/repositories/in-memory-admin-repository'
import { makeAdmin } from 'test/factories/make-admin'
import { MockAuthorizationService } from 'test/mock/mock-authorization-service'
import { ListAdminUseCase } from './list-admin'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'

let inMemoryAdminRepository: InMemoryAdminRepository
let mockAuthorizationService: MockAuthorizationService

let sut: ListAdminUseCase

describe('list admin tests', () => {
  beforeEach(() => {
    inMemoryAdminRepository = new InMemoryAdminRepository()
    mockAuthorizationService = new MockAuthorizationService()

    sut = new ListAdminUseCase(
      inMemoryAdminRepository,
      mockAuthorizationService,
    )
    mockAuthorizationService.clear()
  })

  test('If can list admin', async () => {
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)
    const admin1 = makeAdmin({ name: 'admin1' })
    const admin2 = makeAdmin({ name: 'admin2' })
    const admin3 = makeAdmin({ name: 'admin3' })

    await inMemoryAdminRepository.create(admin1)
    await inMemoryAdminRepository.create(admin2)
    await inMemoryAdminRepository.create(admin3)

    const result = await sut.execute({
      creatorId: adminId,
      page: 1,
    })
    if (result.isRight()) {
      expect(result.value.admin).toEqual([
        expect.objectContaining({ name: 'admin1' }),
        expect.objectContaining({ name: 'admin2' }),
        expect.objectContaining({ name: 'admin3' }),
      ])
    }
  })

  test('If can list paginated admins', async () => {
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)
    for (let i = 1; i <= 22; i++) {
      await inMemoryAdminRepository.create(makeAdmin())
    }

    const result = await sut.execute({
      creatorId: adminId,
      page: 2,
    })

    if (result.isRight()) {
      expect(result.value.admin).toHaveLength(2)
    }
  })
  test('if user that does the action is not admin it cannot get admin list', async () => {
    const adminId = 'not Admin'
    mockAuthorizationService.addFailAuthorizationForId(adminId)
    const admin1 = makeAdmin({ name: 'admin1' })
    const admin2 = makeAdmin({ name: 'admin2' })
    const admin3 = makeAdmin({ name: 'admin3' })

    await inMemoryAdminRepository.create(admin1)
    await inMemoryAdminRepository.create(admin2)
    await inMemoryAdminRepository.create(admin3)

    const result = await sut.execute({
      creatorId: adminId,
      page: 1,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('If an inactive admin cannot get admin list', async () => {
    const adminId = 'invalid Admin'
    mockAuthorizationService.addInactiveAdminId(adminId)
    const admin1 = makeAdmin({ name: 'admin1' })
    const admin2 = makeAdmin({ name: 'admin2' })
    const admin3 = makeAdmin({ name: 'admin3' })

    await inMemoryAdminRepository.create(admin1)
    await inMemoryAdminRepository.create(admin2)
    await inMemoryAdminRepository.create(admin3)

    const result = await sut.execute({
      creatorId: adminId,
      page: 1,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('if creator is not found or unauthorized, it should return NotFoundOrUnauthorizedError', async () => {
    const unknownAdminId = 'unknownAdminId'

    const admin1 = makeAdmin({ name: 'admin1' })
    const admin2 = makeAdmin({ name: 'admin2' })
    const admin3 = makeAdmin({ name: 'admin3' })

    await inMemoryAdminRepository.create(admin1)
    await inMemoryAdminRepository.create(admin2)
    await inMemoryAdminRepository.create(admin3)

    const result = await sut.execute({
      creatorId: unknownAdminId,
      page: 1,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundOrUnauthorizedError)
  })
})
