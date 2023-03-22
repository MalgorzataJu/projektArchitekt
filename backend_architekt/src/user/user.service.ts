import { Injectable } from '@nestjs/common';
import {CreateUserDto} from "./dto/register.dto";
import {RegisterUserRespon} from "../interfaces/user";
import {UserEntity} from "../entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateUserParams, UpdateUserParams} from "../utils/types";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    ) {

    }

    findUsers() {

    }

    createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
        ...userDetails,
        createdAt: new Date(),
    });

    return this.userRepository.save(newUser)
    }

    async register(newUser: CreateUserDto): Promise<RegisterUserRespon> {
        const user = new UserEntity();
        user.email = newUser.email;
        user.password = newUser.password;
        await user.save();

        return user;
    }

    async updateUser(id: string, updateUserDetail: UpdateUserParams) {
        return await this.userRepository.update({id},{...updateUserDetail})
    }

    async deleteUser(id: string) {
        return await this.userRepository.delete({id});
    }
}
