import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppoiontmentDTO from '../dtos/ICreateAppoiontmentDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppoiontmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
