import {Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/register.dto";
import {RegisterUserRespon} from "../interfaces/user";
import {UpdateUserDto} from "./dto/updateUserDto";

@Controller('/user')
export class UserController {

    constructor(
        @Inject(UserService) private userService: UserService,
    ) {
    }

    @Get()
    getUser(){
        return this.userService.findUsers();
    }

    @Post()
    createUser(
        @Body() creteUserDto: CreateUserDto){
         this.userService.createUser(creteUserDto);
    }
    @Post('/register')
    register(
        @Body() newUser: CreateUserDto) : Promise<RegisterUserRespon> {

        return this.userService.register(newUser);
    }
    @Put(':id')
    updateUserById(
        @Param('id') id:string,
        @Body() updateUserDto: UpdateUserDto,
    ){
        this.userService.updateUser(id, updateUserDto)
    }
    @Delete(':id')
    deleteUserById(
        @Param('id') id:string,
    ){
        this.userService.deleteUser(id)
    }


}
