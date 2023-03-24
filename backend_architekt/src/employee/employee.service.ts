import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from '../entities/epmloyee.entity';
import { ProfileEntity } from '../entities/Profile.entity';
import { Repository } from 'typeorm';
import {
  CreateEmployeeProfileParams,
  RegisterEmployeeRespon,
} from '../utils/types';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { UpdateEmployeeDto } from "./dto/updateUser.dto";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private employeeRepository: Repository<EmployeeEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}

  async findUsers() {
    const employee = await EmployeeEntity.find({
      // relations: ['profile'],
    });
    return employee;
  }

  async createUser(
    userDetails: CreateEmployeeDto,
  ): Promise<RegisterEmployeeRespon> {
    const newUser = this.employeeRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });

    return this.employeeRepository.save(newUser);
  }

  async updateUser(id: string, updateUserDetail: UpdateEmployeeDto) {
    return await this.employeeRepository.update(
      { id },
      { ...updateUserDetail },
    );
  }

  async deleteUser(id: string) {
    return await this.employeeRepository.delete({ id });
  }

  async createUserProfile(
    id: string,
    createUserProfileDetails: CreateEmployeeProfileParams,
  ) {
    const user = await this.employeeRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found. Cannot create Profile',
        HttpStatus.BAD_REQUEST,
      );
    const newProfile = this.profileRepository.create(createUserProfileDetails);
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    return this.employeeRepository.save(user);
  }
}
