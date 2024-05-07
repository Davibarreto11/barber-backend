import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository'
import ListProvidersService from './ListProvidersService'
import FakeCacheProvider from '../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider'

let fakeUsersRepository: FakeUsersRepository
let listProvidersService: ListProvidersService
let fakeCacheProvider: FakeCacheProvider

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeCacheProvider = new FakeCacheProvider()
    listProvidersService = new ListProvidersService(fakeUsersRepository, fakeCacheProvider)
  })

  test('Should be able to list the providers', async () => {
    const userOne = await fakeUsersRepository.create({
      name: 'Davi Artur',
      email: 'davi@gmail.com',
      password: '123456'
    })

    const userDoe = await fakeUsersRepository.create({
      name: 'Davi Artur',
      email: 'artur@gmail.com',
      password: '123456'
    })

    const loggedUser = await fakeUsersRepository.create({
      name: 'Davi Artur',
      email: 'vieira@gmail.com',
      password: '123456'
    })

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id
    })

    expect(providers).toEqual([
      userOne,
      userDoe
    ])
  })
})
