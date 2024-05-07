import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderMonthAvailability: ListProviderMonthAvailabilityService

describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()

    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository
    )
  })

  test('Should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: new Date(2023, 11, 5, 8, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: new Date(2023, 11, 6, 8, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: new Date(2023, 11, 6, 9, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: new Date(2023, 11, 6, 10, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: new Date(2023, 11, 6, 11, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: new Date(2023, 11, 6, 12, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: new Date(2023, 11, 6, 13, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: new Date(2023, 11, 6, 14, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: new Date(2023, 11, 6, 15, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: new Date(2023, 11, 6, 16, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: new Date(2023, 11, 6, 17, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: new Date(2023, 11, 7, 8, 0, 0)
    })

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2023,
      month: 12
    })

    expect(availability).toEqual(expect.arrayContaining([
      { day: 5, available: true },
      { day: 6, available: false },
      { day: 7, available: true }
    ]))
  })
})
