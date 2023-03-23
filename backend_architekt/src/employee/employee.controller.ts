import {Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import {CreateUserProfileParams, RegisterUserRespon} from "../utils/types";
import {EmployeeService} from "./employee.service";
import {CreateUserDto} from "./dto/register.dto";
import {UpdateUserDto} from "./dto/updateUserDto";

@Controller('/user')
export class EmployeeController {

    constructor(
        @Inject(EmployeeService) private employeeService: EmployeeService,
    ) {
    }

    @Get('/')
    getUser(){
        return this.employeeService.findUsers();
    }

    @Post('/')
    createUser(
        @Body() newUser: CreateUserDto){
        this.employeeService.createUser(newUser);
    }
    @Post('/register')
    register(
        @Body() newUser: CreateUserDto) : Promise<RegisterUserRespon> {

        return this.employeeService.register(newUser);
    }
    @Put('/:id')
    updateUserById(
        @Param('id') id:string,
        @Body() updateUserDto: UpdateUserDto,
    ){
        this.employeeService.updateUser(id, updateUserDto)
    }
    @Delete('/:id')
    deleteUserById(
        @Param('id') id:string,
    ){
        this.employeeService.deleteUser(id)
    }

    @Post(':id/profiles')
    createUserProfile(
        @Param('id') id: string,
        @Body() userProfile: CreateUserProfileParams
    ){
        return this.employeeService.createUserProfile(id, userProfile);
    }



}
