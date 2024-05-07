import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import FakeCacheProvider from '../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider'

import ListProviderAppointmentsService from './ListProviderAppointmentsService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let fakeCacheProvider: FakeCacheProvider
let listProviderAppointmentsRepository: ListProviderAppointmentsService

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    fakeCacheProvider = new FakeCacheProvider()
    listProviderAppointmentsRepository = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider
    )
  })

  test('Should be able to list the appointments on a specific day', async () => {
    const appointmentOne = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user_id',
      date: new Date(2023, 11, 7, 14, 0, 0)
    })

    const appointmentTwo = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user_id',
      date: new Date(2023, 11, 7, 15, 0, 0)
    })

    const appointments = await listProviderAppointmentsRepository.execute({
      provider_id: 'provider',
      year: 2023,
      month: 12,
      day: 7
    })

    expect(appointments).toEqual([
      appointmentOne,
      appointmentTwo
    ])
  })
})
