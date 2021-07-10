import { Repository, getRepository } from 'typeorm'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppoiontmentDTO from '@modules/appointments/dtos/ICreateAppoiontmentDTO';

import Appointment from '../entities/Appointment';

class AppointmentRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date }
    });

    return findAppointment;
  };

  public async create({ provider_id, date }: ICreateAppoiontmentDTO): Promise<Appointment> {
    const appointment = await this.ormRepository.create({
      provider_id,
      date
    });

    await this.ormRepository.save(appointment);

    return appointment;
  };
};

export default AppointmentRepository;
