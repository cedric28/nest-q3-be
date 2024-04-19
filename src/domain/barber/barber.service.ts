//this service will call all the functionalities related to the barber
import { Injectable, Logger  } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class BarberService {
  constructor(private readonly prisma: PrismaService) {}
  private logger = new Logger('Barber Service');
  async calculateWaitingTime(): Promise<number> {
    const numberOfCustomerResults = await this.prisma.customer.count({
      where: { status: 'waiting' },
    });
    const numberOfBarberResults = await this.prisma.barber.count({
      where: {
        shiftStart: { lte: new Date() },
        shiftEnd: { gte: new Date() },
      },
    });
    const serviceInterval = 30; // minutes
    const serviceTimePerBarber = 25; // minutes
    //calculate the waiting time
    let waitingTime = 0;
    if (numberOfCustomerResults > numberOfBarberResults) {
      const additionalCustomers = numberOfCustomerResults - numberOfBarberResults;
      const additionalBarbers = Math.ceil(additionalCustomers / serviceInterval);
      waitingTime = additionalBarbers * serviceTimePerBarber;
    }

    return waitingTime;
  }
}
