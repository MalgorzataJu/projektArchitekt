import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HourEntity } from '../entities/Hour.entity';
import { Repository } from 'typeorm';
import {
  ListAllToAddHoursRes,
  ListHourRes,
  ListHourResAll,
  ProjectNameRes,
} from '../utils/types';
import { CreateHourDto } from './dto/createHour.dto';
import { UpdateHourDto } from './dto/updateHour.dto';
import { ProjectService } from '../project/project.service';
import { EmployeeService } from '../employee/employee.service';
import { KindOfWorkService } from '../kind-of-work/kind-of-work.service';
import { ProjectEntity } from '../entities/Project.entity';
import { KindOfWorkEntity } from '../entities/Kind-of-work.entity';
import { EmployeeEntity } from "../entities/Employee.entity";

@Injectable({ scope: Scope.REQUEST })
export class HourService {
  constructor(
    @Inject(ProjectService) private projectService: ProjectService,
    @Inject(EmployeeService) private employeeService: EmployeeService,
    @Inject(KindOfWorkService) private kindOfWorkService: KindOfWorkService,
  ) {}

  async listAll(): Promise<ListHourResAll[]> {
    const hours = await HourEntity.find({
      relations: ['project', 'employee', 'kindofwork'],
    });

    return hours.map((hour, index) => {
      const h = {
        id: hour.id,
        projectId: hour.project.name,
        employeeId: hour.employee.email,
        kindofworkId: hour.kindofwork.hourstype,
        quantity: hour.quantity,
        date: new Date(hour.date).toLocaleDateString(),
      };
      return {
        place: index + 1,
        hour: h,
      };
    });
  }

  async listProjectEmployeeKindeOfWorkAll(): Promise<ListAllToAddHoursRes> {

    const projectList = (await ProjectEntity.find()).map((el) => ({
      id: el.id,
      name: el.name,
    }));

    const kindofworkList = (await KindOfWorkEntity.find()).map((el) => ({
      id: el.id,
      hourstype: el.hourstype,
    }));

    const employeeList = (await EmployeeEntity.find({
      relations: ['profile']
    }))
      .map((el) => ({
      id: el.id,
      name: el.profile.name,
    }));

    return {
      employeeList: employeeList,
      projectList: projectList,
      kindofworkList: kindofworkList,
    };
  }

  async getAllForEmplooyee(enployeeId: string) {
    const employee = await this.employeeService.getOne(enployeeId);
    if (!employee) {
      throw new Error('Employeee not found!');
    }

    const hours = HourEntity.find({
      where: {
        employee: {
          id: employee.id,
        },
      },
      relations: ['project', 'employee', 'kindofwork'],
    });
    return hours;
  }

  async getAllStatByProject(projectId: string) {
    const hours = await HourEntity.createQueryBuilder()
      .select('hours')
      .from(HourEntity, 'hours')
      .where('hours.project LIKE :projectid', {
        projectid: projectId,
      })
      .getMany();

    return hours;
  }
  async getAllStatHourByEmplooyee(employeeid: string) {
    const hours = await HourEntity.createQueryBuilder()
      .select('hours.quantity')
      .from(HourEntity, 'hours')
      .where('hours.employee LIKE :employeeid', {
        employeeid: employeeid,
      })
      .getMany();
    const hourSum = hours.reduce((prev, curr) => prev + curr.quantity, 0);

    return hours;
  }

  // // @TODO() do poprawy
  // async getAllStatHourByEmplooyeeandProject(
  //   employeeid: string,
  //   projectid: string,
  // ) {
  //   const hours = await HourEntity.createQueryBuilder()
  //     .select('hours')
  //     .from(HourEntity, 'hours')
  //     .where('hours.employee LIKE :employeeid', {
  //       employeeid: employeeid,
  //     })
  //     // .where('hours.project LIKE :projectid', {
  //     //   projectid: '44',
  //     // })
  //     // .leftJoin()
  //     .getMany();
  //   console.log(hours);
  //   return hours;
  //   // return 'hours';
  // }
  //
  // async getAllForProject(
  //   employeeId: string,
  //   projectId: string,
  // ) {
  //   const employee = await this.employeeService.getOne(employeeId);
  //   if (!employee) {
  //     throw new Error('Employeee not found!');
  //   }
  //   const project = await this.projectService.getOneProject(projectId);
  //   if (!project) {
  //     throw new Error('Project not found!');
  //   }
  //
  //   const hours = HourEntity.find({
  //     where: {
  //       employee: {
  //         id: employee.id,
  //       },
  //       project: {
  //         id: project.id,
  //       },
  //     },
  //     relations: ['project', 'employee', 'kindofwork'],
  //   });
  //   return hours;
  // }

  async createHour(hour: CreateHourDto): Promise< {isSuccess: boolean} > {

    const { projectId, employeeId, quantity, kindofworkId } = hour;

    const project = await this.projectService.getOneProject(projectId);
    const employee = await this.employeeService.getOne(employeeId);
    const kindOfWork = await this.kindOfWorkService.getOneKindOfWork(kindofworkId);

    if (
      projectId === '' ||
      employeeId === '' ||
      kindofworkId === '' ||
      quantity < 0 ||
      !project ||
      !employee ||
      !kindOfWork
    ) {
      return {
        isSuccess: false,
      };
    }

    const newHour = await HourEntity.create({
          ...hour,
          quantity: Number(quantity),
          project,
          employee,
          kindofwork: kindOfWork,
    });

    await HourEntity.save(newHour);

    return { isSuccess: true };
  }

  async updateHour(id: string, updateHour: UpdateHourDto) {
    return await HourEntity.update({ id }, { ...updateHour });
  }

  async deleteHour(id: string) {
    return await HourEntity.delete({ id });
  }

  async deleteHourForEmployee(employeeId: string, id: string) {
    const employee = await this.employeeService.getOne(employeeId);
    if (!employee) {
      throw new Error('Employeee not found!');
    }

    return await HourEntity.delete({ id });
  }
}
