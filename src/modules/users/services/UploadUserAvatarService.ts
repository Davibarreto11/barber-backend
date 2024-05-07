import { injectable, inject } from 'tsyringe'

import AppError from '../../../shared/errors/AppError'

import type User from '../infra/typeorm/entities/User'

import IUsersRepository from '../repositories/IUsersRepository'
import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider'

interface IRequest {
  user_id: string
  avatarFilename: string | undefined
}

@injectable()
class UploadUserAvatarService {
  constructor (
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private readonly storageProvider: IStorageProvider
  ) {}

  public async execute ({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401)
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar)
    }

    if (avatarFilename) {
      const fileName = await this.storageProvider.saveFile(avatarFilename)

      user.avatar = fileName
    }

    await this.usersRepository.save(user)

    return user
  }
}

export default UploadUserAvatarService
