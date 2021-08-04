import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, getHours } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  day: number;
  month: number;
  year: number;
};

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({ provider_id, year, month, day }: IRequestDTO): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      year,
      month,
      day
    });

    const hourStart = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart
    );

    const availability = eachHourArray.map(hour => {
      const hasAppointmentsInHour = appointments.find(appointment => {
        return getHours(appointment.date) === hour;
      });

      return {
        hour,
        available: !hasAppointmentsInHour
      };
    });

    return availability;
  };
};

export default ListProviderDayAvailabilityService;
