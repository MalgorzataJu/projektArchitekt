import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HourEntity } from '../entities/Hour.entity';
import { Repository } from 'typeorm';
import { ListHourResAll } from '../utils/types';
import { CreateHourDto } from './dto/createHour.dto';
import { UpdateHourDto } from './dto/updateHour.dto';
import { ProjectService } from '../project/project.service';
import { EmployeeService } from '../employee/employee.service';
import { KindOfWorkService } from '../kind-of-work/kind-of-work.service';

@Injectable({ scope: Scope.REQUEST })
export class HourService {
  constructor(
    @Inject(ProjectService) private projectService: ProjectService,
    @Inject(EmployeeService) private employeeService: EmployeeService,
    @Inject(KindOfWorkService) private kindOfWorkService: KindOfWorkService,
  ) {}

  async listAll(): Promise<ListHourResAll> {
    const hours = HourEntity.find({
      relations: ['project','employee','kindofwork'],
    });
    return hours;
  }

  async getAllForEmplooyee(enployeeId: string): Promise<ListHourResAll> {
    const employee = await this.employeeService.getOneEmployee(enployeeId);
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

  async getAllForProject(
    employeeId: string,
    projectId: string,
  ): Promise<ListHourResAll> {
    const employee = await this.employeeService.getOneEmployee(employeeId);
    if (!employee) {
      throw new Error('Employeee not found!');
    }
    const project = await this.projectService.getOneProject(projectId);
    if (!project) {
      throw new Error('Project not found!');
    }

    const hours = HourEntity.find({
      where: {
        employee: {
          id: employee.id,
        },
        project: {
          id: project.id,
        },
      },
      relations: ['project','employee','kindofwork'],
    });
    return hours;
  }

  async createHour(hour: CreateHourDto) {
    const { projectId, employeeId, quantity, kindofworkId } = hour;
    const project = await this.projectService.getOneProject(projectId);
    const employee = await this.employeeService.getOneEmployee(employeeId);
    const kindOfWork = await this.kindOfWorkService.getOneKindOfWork(
      kindofworkId,
    );

    if (
      typeof projectId !== 'string' ||
      typeof employeeId !== 'string' ||
      typeof quantity !== 'number' ||
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

    const newHour = HourEntity.create({
      ...hour,
      date: new Date(),
    });

    return HourEntity.save(newHour);
  }

  async updateHour(id: string, updateHour: UpdateHourDto) {
    return await HourEntity.update({ id }, { ...updateHour });
  }

  async deleteHour(id: string) {
    return await HourEntity.delete({ id });
  }

  async deleteHourForEmployee(employeeId:string, id: string) {
    const employee = await this.employeeService.getOneEmployee(employeeId);
    if (!employee) {
      throw new Error('Employeee not found!');
    }

    return await HourEntity.delete({ id });
  }
}
