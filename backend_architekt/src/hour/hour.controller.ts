import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put, UseGuards, UseInterceptors
} from "@nestjs/common";
import { HourService } from './hour.service';
import { CreateHourDto } from './dto/createHour.dto';
import { UpdateHourDto } from './dto/updateHour.dto';
import { ListAllToAddHoursRes, ListHourRes, ListHourResAll } from "../utils/types";
import { PassordProtectGuard } from "../guards/passord-protect-guard";
import { UsePassword } from "../decorators/use-password.decorator";
import { MyTimeoutInterceptor } from "../interceptors/my-timeout.interceptor";
import { AuthGuard } from "@nestjs/passport";
import { UserObj } from "../decorators/user-obj.decorator";
import { EmployeeEntity } from "../entities/Employee.entity";

@Controller('/hour')
@UseGuards(AuthGuard('jwt'))
export class HourController {
  constructor(@Inject(HourService) private hourService: HourService) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(MyTimeoutInterceptor)
  getHour(): Promise<ListHourResAll[]> {
    return this.hourService.listAll();
  }

  @Get('/add')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(MyTimeoutInterceptor)
  listProjectEmployeeAnKindOfWorkToAddHours(): Promise<ListAllToAddHoursRes> {
    return this.hourService.listProjectEmployeeKindeOfWorkAll();
  }
  // @Get('/stat/:employeeId/:projectId')
  // @UseGuards(PassordProtectGuard)
  // @UsePassword('admin1')
  // getEmployeeStatByProject(
  //   @Param('employeeId') employeeid: string,
  //   @Param('projectId') projectid: string,
  // ){
  //   return this.hourService.getAllStatHourByEmplooyeeandProject(employeeid, projectid);
  // }

  @Get('/stat/:employeeId')
  getEmployeeStat( @Param('employeeId') id: string){
    return this.hourService.getAllStatHourByEmplooyee(id);
  }

  // @Get('/:employeeId')
  // getHourByEmployeeId(
  //   @Param('employeeId') id: string,
  // ): Promise<ListHourResAll> {
  //   return this.hourService.getAllForEmplooyee(id);
  // }
  //
  // @Get('/:employeeId/:projectId')
  // getHourByProjectId(
  //   @Param('employeeId') employeeId: string,
  //   @Param('projectId') projectId: string,
  // ): Promise<ListHourResAll> {
  //   return this.hourService.getAllForProject(employeeId, projectId);
  // }

  @Post('/')
  createHour(
    @Body() newHour: CreateHourDto,
  ) {
    return this.hourService.createHour(newHour);
  }

  @Put('/:id')
  updateHourtById(
    @Param('id') id: string,
    @Body() updateHour: UpdateHourDto,

  ) {
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
