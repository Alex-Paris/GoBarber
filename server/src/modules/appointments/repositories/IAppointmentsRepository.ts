import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppoiontmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppoiontmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInDayFromProvider(data: IFindAllInDayFromProviderDTO): Promise<Appointment[]>;
  findAllInMonthFromProvider(data: IFindAllInMonthFromProviderDTO): Promise<Appointment[]>;
}
