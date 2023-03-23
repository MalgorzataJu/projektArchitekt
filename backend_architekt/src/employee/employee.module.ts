import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProfileEntity} from "../entities/Profile.entity";
import {KindOfWorkEntity} from "../entities/Kind-of-work.entity";
import {HourEntity} from "../entities/Hour.entity";
import {ProjectEntity} from "../entities/Project.entity";
import {TaskEntity} from "../entities/Task.entity";
import {EmployeeEntity} from "../entities/epmloyee.entity";
import {EmployeeService} from "./employee.service";
import {EmployeeController} from "./employee.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeEntity, ProfileEntity, KindOfWorkEntity, ProjectEntity, TaskEntity, HourEntity]),
  ],
  providers: [EmployeeService],
  controllers: [EmployeeController],
  exports: [EmployeeService],
})
export class EmployeeModule {}