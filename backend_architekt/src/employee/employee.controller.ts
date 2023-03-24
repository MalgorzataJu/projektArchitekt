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
import { EmployeeService } from './employee.service';
import {
  CreateEmployeeProfileParams,
} from '../utils/types';
import { CreateEmployeeDto } from "./dto/createEmployee.dto";
import { UpdateEmployeeDto } from "./dto/updateUser.dto";

@Controller('/employee')
export class EmployeeController {
  constructor(
    @Inject(EmployeeService) private employeeService: EmployeeService,
  ) {}

  @Get('/')
  getEmployee(){
    return this.employeeService.findEmployee();
  }

  @Post('/')
  createEmployee(@Body() newUser: CreateEmployeeDto) {
    this.employeeService.createEmployee(newUser);
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
