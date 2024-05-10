import { injectable, inject } from "tsyringe";
import { startOfHour, isBefore, getHours, format } from "date-fns";

import AppError from "../../../shared/errors/AppError";

import type Appointment from "../infra/typeorm/entities/Appointment";

import IAppointmentRepository from "../repositories/IAppointmentsRepository";
import INotifcationRepository from "../../../modules/notifications/repositories/INotificationRepository";
import ICacheProvider from "../../../shared/container/providers/CacheProvider/models/ICacheProvider";

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateBetService {
  constructor(
    @inject("AppointmentsRepository")
    private readonly appointmentsRepository: IAppointmentRepository,

    @inject("NotificationsRepository")
    private readonly notificationsRepository: INotifcationRepository,

    @inject("CacheProvider")
    private readonly cacheProvider: ICacheProvider
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on past date.");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself.");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 18) {
      throw new AppError(
        "You can only create appointements between 8am and 18pm."
      );
    }

    const findAppointmentInSameDate =
      await this.appointmentsRepository.findByDate(
        appointmentDate,
        provider_id
      );

    if (findAppointmentInSameDate) {
      throw new AppError("This appointment is already booked");
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const dateFormated = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${dateFormated}`,
    });

    // await this.cacheProvider.invalidate(
    //   `provider-appointments:${provider_id}:${format(appointmentDate, 'yyyy-M-d')}`
    // )

    return appointment;
  }
}

export default CreateBetService;
