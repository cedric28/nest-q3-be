import { Module } from '@nestjs/common';
import { BarberController } from './barber.controller';
import { BarberService } from '../../domain/barber/barber.service';
import { PrismaModule } from '../../database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],//import prisma module to use prisma service
  controllers: [BarberController],
  providers: [BarberService],
})
export class BarberModule {}
