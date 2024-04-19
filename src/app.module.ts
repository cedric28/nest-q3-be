import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BarberModule } from './api/barber/barber.module';

@Module({
  imports: [BarberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
