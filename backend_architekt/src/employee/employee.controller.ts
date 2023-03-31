import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put, UseGuards, UseInterceptors, ValidationPipe
} from "@nestjs/common";
import { EmployeeService } from './employee.service';
import {
  CreateEmployeeProfileParams,
} from '../utils/types';
import { CreateEmployeeDto } from "./dto/createEmployee.dto";
import { UpdateEmployeeDto } from "./dto/updateUser.dto";
import { RegisterEmployeeRegDto } from "./dto/registerEmployeeReg.dto";
import { AuthGuard } from "@nestjs/passport";
import { MyTimeoutInterceptor } from "../interceptors/my-timeout.interceptor";

@Controller('/employee')
export class EmployeeController {
  constructor(
    @Inject(EmployeeService) private employeeService: EmployeeService,
  ) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(MyTimeoutInterceptor)
  getEmployee(){
    return this.employeeService.findEmployee();
  }

  @Get('/:employeeid')
  getEmployeeById(
    @Param('employeeid') id: string) {

    return this.employeeService.getOne(id);
  }

  getEmployeeByEmail(
    @Param('employeeid') id: string) {

    return this.employeeService.getOne(id);
  }

  @Get('/stat/:employeeid')
  getAllForEmployeeById(
  @Param('employeeid') id: string) {
    return this.employeeService.getAllForEmployee(id);
  }

  @Post('/register')
  createEmployee(@Body() newUserRegister: RegisterEmployeeRegDto) {
    return this.employeeService.createEmployee(newUserRegister);
  }

  @Put('/:id')
  updateEmployeeById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateEmployeeDto,
  ) {
    this.employeeService.updateEmployee(id, updateUserDto);
  }
  @Delete('/:id')
  deleteEmployeeById(@Param('id') id: string) {
    this.employeeService.deleteEmployee(id);
  }

  @Post(':id/profiles')
  createEmployeeProfile(
    @Param('id') id: string,
    @Body() userProfile: CreateEmployeeProfileParams,
  ) {
    return this.employeeService.createEmployeeProfile(id, userProfile);
  }
}
