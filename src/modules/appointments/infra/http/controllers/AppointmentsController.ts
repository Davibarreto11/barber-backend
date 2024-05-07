import { type Request, type Response } from 'express'
import { container } from 'tsyringe'
import CreateappointmentService from '../../../services/CreateAppointmentService'

export default class AppointmentController {
  public async create (request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const {
      provider_id,
      date
    } = request.body

    const createappointment = container.resolve(CreateappointmentService)

    const appointment = await createappointment.execute({
      date,
      provider_id,
      user_id
    })

    return response.json(appointment)
  }
}
