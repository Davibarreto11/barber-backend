import { injectable, inject } from 'tsyringe'
import path from 'path'

import AppError from '../../../shared/errors/AppError'

import IUsersRepository from '../repositories/IUsersRepository'
import IMailProvider from '../../../shared/container/providers/MailProvider/models/IMailProvider'
import IUserTokenRepository from '../repositories/IUserTokenRepository'

interface IRequest {
  email: string
}

@injectable()
class SendForgotPasswordEmailService {
  constructor (
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,

    @inject('MailProvider')
    private readonly mailProvider: IMailProvider,

    @inject('UsersTokenRepository')
    private readonly usersTokenRepository: IUserTokenRepository
  ) {}

  public async execute ({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User does not exists.')
    }

    const { token } = await this.usersTokenRepository.generated(user.id)

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    )

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[Okinão] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset-password?token=${token}`
        }
      }
    })
  }
}

export default SendForgotPasswordEmailService
