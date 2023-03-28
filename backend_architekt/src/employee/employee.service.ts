import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Scope,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from '../entities/Employee.entity';
import { ProfileEntity } from '../entities/Profile.entity';
import { Repository } from 'typeorm';
import {
  CreateEmployeeProfileParams,
  ListEmployeeResAll,
  RegisterEmployeeRespon,
} from '../utils/types';
import { UpdateEmployeeDto } from './dto/updateUser.dto';
import { RegisterEmployeeRegDto } from './dto/registerEmployeeReg.dto';
import { hashPwd } from '../utils/hash-pwd';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}
  async findEmployee() {
    const employee = await EmployeeEntity.find({
      relations:['profile'],
    });

    const restEmployeeList = employee.map((emp, index) => {
      return {
        place: index + 1,
        employee: emp,
      };
    });
    return restEmployeeList;
  }

  async getOne(id: string): Promise<EmployeeEntity> {
    return await EmployeeEntity.findOne({ where: { id } });
  }

  async getOneByEmail(email: string): Promise<EmployeeEntity> {
    return await EmployeeEntity.findOneBy({ email });
  }

  async getAllForEmployee(id: string) {
    // const employee = await EmployeeEntity.findOne({ where: {
    //   id,
    //   // hours,
    //   } });
    // const hours = await this.hours.getOneEmployee(id)
    return 'hours';
  }

  async createEmployee(
    userDetails: RegisterEmployeeRegDto,
  ): Promise<RegisterEmployeeRespon> {
    const { email, name, password, lastname, hourly } = userDetails;

    const user = await EmployeeEntity.findOneBy({ email });

    if (user)
      throw new HttpException(
        'That email existing in the base. Use another email.',
        HttpStatus.BAD_REQUEST,
      );

    const newUser = await EmployeeEntity.create({
      ...userDetails,
      password: hashPwd(password),
      createdAt: new Date(),
    });
    const { id } = await EmployeeEntity.save(newUser);

    this.createEmployeeProfile(id, userDetails);
    return {
      id,
      name,
      lastname,
      hourly,
    };
  }

  async updateEmployee(id: string, updateUserDetail: UpdateEmployeeDto) {
    return await EmployeeEntity.update({ id }, { ...updateUserDetail });
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
