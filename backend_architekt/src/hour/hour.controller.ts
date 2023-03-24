import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HourService } from './hour.service';
import { CreateHourDto } from './dto/createHour.dto';
import { UpdateHourDto } from './dto/updateHour.dto';
import { ListHourResAll } from '../utils/types';

@Controller('/hour')
export class HourController {
  constructor(@Inject(HourService) private hourService: HourService) {}

  @Get('/')
  getHour(): Promise<ListHourResAll> {
    return this.hourService.listAll();
  }

  // @Get('/stat/:employee')
  // getEmployeeStat(){
  //   return this.hourService.getAllForEmplooyee();
  // }
  @Get('/:employeeId')
  getHourByEmployeeId(
    @Param('employeeId') id: string,
  ): Promise<ListHourResAll> {
    return this.hourService.getAllForEmplooyee(id);
  }

  @Get('/:employeeId/:projectId')
  getHourByProjectId(
    @Param('employeeId') employeeId: string,
    @Param('projectId') projectId: string,
  ): Promise<ListHourResAll> {
    return this.hourService.getAllForProject(employeeId, projectId);
  }

  @Post('/')
  createHour(@Body() newHour: CreateHourDto) {
    return this.hourService.createHour(newHour);
  }

  @Put('/:id')
  updateHourtById(@Param('id') id: string, @Body() updateHour: UpdateHourDto) {
    this.hourService.updateHour(id, updateHour);
  }

  @Delete('/:id')
  deleteHourById(@Param('id') id: string) {
    this.hourService.deleteHour(id);
  }
  @Delete('/:employeeId/:hourId')
  deleteHourEmployeeById(
    @Param('employeeId') employeeId: string,
    @Param('hourId') id: string,
  ) {
    this.hourService.deleteHourForEmployee(employeeId, id);
    return {
      isSuccess: true,
    };
  }
}
