import { HttpException, HttpStatus, Inject, Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from '../entities/Employee.entity';
import { ProfileEntity } from '../entities/Profile.entity';
import { Repository } from 'typeorm';
import {
  CreateEmployeeProfileParams,
  RegisterEmployeeRespon,
} from '../utils/types';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { UpdateEmployeeDto } from "./dto/updateUser.dto";

@Injectable({ scope: Scope.REQUEST })
export class EmployeeService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}
  async findEmployee() {
    const employee = await EmployeeEntity.find({
      // relations: ['tasks'],
    });
    return employee;
  }

  async getOneEmployee(id: string): Promise<EmployeeEntity> {
    return EmployeeEntity.findOne({ where: { id } });
  }

  async createEmployee(userDetails: CreateEmployeeDto): Promise<RegisterEmployeeRespon> {
    const { email } = userDetails;

    const user = await EmployeeEntity.findOneBy({ email });

    if (user) console.log("Email zajęty");
    //   throw new HttpException(
    //     'User not found. Cannot create Profile',
    //     HttpStatus.BAD_REQUEST,
    //   );

    const newUser = EmployeeEntity.create({
      ...userDetails,
      createdAt: new Date(),
    });

    return EmployeeEntity.save(newUser);
  }

  async updateEmployee(id: string, updateUserDetail: UpdateEmployeeDto) {
    return await EmployeeEntity.update(
      { id },
      { ...updateUserDetail },
    );
  }

  async deleteEmployee(id: string) {
    return await EmployeeEntity.delete({ id });
  }

  async createEmployeeProfile(
    id: string,
    createUserProfileDetails: CreateEmployeeProfileParams,
  ) {
    const user = await EmployeeEntity.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found. Cannot create Profile',
        HttpStatus.BAD_REQUEST,
      );
    const newProfile = this.profileRepository.create(createUserProfileDetails);
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    return EmployeeEntity.save(user);
  }
}
