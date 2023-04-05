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
  CreateEmployeeProfileParams, CreateEmployeeRes, ListEmployeeResAll
} from "../utils/types";
import { UpdateEmployeeDto } from './dto/updateUser.dto';
import { RegisterEmployeeRegDto } from './dto/registerEmployeeReg.dto';
import { hashPwd } from '../utils/hash-pwd';

@Injectable()
export class EmployeeService {
  filter(employee: EmployeeEntity ): CreateEmployeeRes{
    const {id, email} = employee;

    return {id, email }
  }
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}

  async allEmployee(): Promise<ListEmployeeResAll[]>{

    const employee = await EmployeeEntity.find({
      relations: ['profile'],
    });

    return employee.map((emp, index) => {
      const employee = {
        id: emp.id,
        email: emp.email,
        name: emp.profile.name,
        lastname: emp.profile.lastname,
        hourly: emp.profile.hourly,
      };
      return {
        place: index + 1,
        employee: employee,
      };
    });
  }

  async getOne(id: string) {
    console.log('przekazane ID', id);
    return await EmployeeEntity.findOne({ where: { id } });
  }

  async getOneByEmail(email: string): Promise<EmployeeEntity> {
    return await EmployeeEntity.findOneBy({ email });
  }

  async getOneEmployee(id: string) {
    const employee = await EmployeeEntity.findOne({ where: { id } });
    console.log('pracownik',employee);
    return employee;
  }

  async createEmployee(userDetails: RegisterEmployeeRegDto): Promise<CreateEmployeeRes> {
    const { email, password } = userDetails;
    const user = await EmployeeEntity.findOneBy({ email });

    if (user)
      throw new HttpException(
        {
          isOk: false,
          message: 'That email existing in the base. Use another email.',
        },
        HttpStatus.BAD_REQUEST,
      );

    const newUser = await EmployeeEntity.create({
      ...userDetails,
      password: hashPwd(password),
      createdAt: new Date(),
    });
    const { id } = await EmployeeEntity.save(newUser);

    this.createEmployeeProfile(id, userDetails);

    return this.filter(newUser);
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
