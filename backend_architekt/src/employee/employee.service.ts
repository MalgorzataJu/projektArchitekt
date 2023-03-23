import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateUserParams, CreateUserProfileParams, RegisterUserRespon, UpdateUserParams} from "../utils/types";
import {ProfileEntity} from "../entities/Profile.entity";
import {EmployeeEntity} from "../entities/epmloyee.entity";
import {CreateUserDto} from "./dto/register.dto";

@Injectable()
export class EmployeeService {

    constructor(
        @InjectRepository(EmployeeEntity) private userRepository: Repository<EmployeeEntity>,
        @InjectRepository(ProfileEntity) private profileRepository: Repository<ProfileEntity>,
    ) {

    }

    findUsers() {
        return this.userRepository.find({
            relations: ['profile'],
        });
    }

    createUser(userDetails: CreateUserParams) {
        const newUser = this.userRepository.create({
            ...userDetails,
            createdAt: new Date(),
        });

        return this.userRepository.save(newUser)
    }

    async register(newUser: CreateUserDto): Promise<RegisterUserRespon> {
        const user = new EmployeeEntity();
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

    async createUserProfile(
        id: string,
        createUserProfileDetails: CreateUserProfileParams
    ) {
        const user = await this.userRepository.findOneBy({id});
        if (!user)
            throw new HttpException(
                'User not found. Cannot create Profile',
                HttpStatus.BAD_REQUEST,
            );
        const newProfile = this.profileRepository.create( createUserProfileDetails);
        const savedProfile = await this.profileRepository.save(newProfile);
        user.profile = savedProfile;
        return this.userRepository.save(user);
    }
}
