import { container } from 'tsyringe'

import '../../modules/users/providers'
import './providers'

import type IAppointmentsRepository from '../../modules/appointments/repositories/IAppointmentsRepository'
import AppointmentsRepository from '../../modules/appointments/infra/typeorm/repositories/AppointmentsRepository'

import type IUsersRepository from '../../modules/users/repositories/IUsersRepository'
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository'

import type IUserTokenRepository from '../../modules/users/repositories/IUserTokenRepository'
import UsersTokenRepository from '../../modules/users/infra/typeorm/repositories/UsersTokenRepository'

import type INotifcationRepository from '../../modules/notifications/repositories/INotificationRepository'
import NotificationsRepository from '../../modules/notifications/infra/typeorm/repositories/NotificationRepository'

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IUserTokenRepository>(
  'UsersTokenRepository',
  UsersTokenRepository
)

container.registerSingleton<INotifcationRepository>(
  'NotificationsRepository',
  NotificationsRepository
)
