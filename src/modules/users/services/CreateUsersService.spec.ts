import AppError from '../../../shared/errors/AppError'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeCacheProvider from '../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider'

import CreateUsersService from './CreateUsersServiece'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let fakeCacheProvider: FakeCacheProvider
let createUser: CreateUsersService

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    fakeCacheProvider = new FakeCacheProvider()

    createUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider
    )
  })

  test('Should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'email@mail.com',
      password: '123456'
    })

    expect(user).toHaveProperty('id')
  })

  test('Should not be able to create new user with same email from another', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'email@mail.com',
      password: '123456'
    })

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'email@mail.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
