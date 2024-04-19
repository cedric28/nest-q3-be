//this controller will handle all the HTTP Request
import { Controller, Get, Res,HttpStatus } from '@nestjs/common';
import { BarberService } from '../../domain/barber/barber.service';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { Response} from "express"

@Controller('api/barbers')
export class BarberController {
  constructor(private readonly barberService: BarberService) {}

  @Get('hello')
  @ApiOkResponse({
    description: 'Hello',
  })
  async getAllBarbers(@Res() res: Response) {
    return res.status(HttpStatus.OK).send({message: "hello"});
  }

  @Get('waiting-time')
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async getWaitingTime(@Res() res: Response){
    try {
      const waitingTime = await this.barberService.calculateWaitingTime();
      return res.status(HttpStatus.OK).send({data:[{ waiting: waitingTime }]});
    }catch(err){
      return res.status(err.status).send("Error");
    }
  }
}
