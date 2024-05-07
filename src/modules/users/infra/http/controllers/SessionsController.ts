import { type Request, type Response } from 'express'
import { container } from 'tsyringe'
import { classToPlain } from 'class-transformer'

import AuthenticateUserService from '../../../services/AuthenticateUserService'

class SessionController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const authenticateUser = container.resolve(AuthenticateUserService)

    const { user, token } = await authenticateUser.execute({
      email,
      password
    })

    return response.json({ user: classToPlain(user), token })
  }
}

export default new SessionController()
