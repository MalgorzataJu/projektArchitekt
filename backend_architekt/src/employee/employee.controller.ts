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
  getUser() {
    return this.employeeService.findUsers();
  }

  @Post('/')
  createUser(@Body() newUser: CreateEmployeeDto) {
    this.employeeService.createUser(newUser);
  }

  @Put('/:id')
  updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateEmployeeDto,
  ) {
    this.employeeService.updateUser(id, updateUserDto);
  }
  @Delete('/:id')
  deleteUserById(@Param('id') id: string) {
    this.employeeService.deleteUser(id);
  }

  @Post(':id/profiles')
  createUserProfile(
    @Param('id') id: string,
    @Body() userProfile: CreateEmployeeProfileParams,
  ) {
    return this.employeeService.createUserProfile(id, userProfile);
  }
}
