import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from '../entities/Profile.entity';
import { EmployeeEntity } from '../entities/epmloyee.entity';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { KindOfWorkEntity } from "../entities/Kind-of-work.entity";
import { TaskEntity } from "../entities/Task.entity";
import { HourEntity } from "../entities/Hour.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmployeeEntity,
      ProfileEntity,
      KindOfWorkEntity,
      ProfileEntity,
      TaskEntity,
      HourEntity,
    ]),
  ],
  providers: [EmployeeService],
  controllers: [EmployeeController],
  exports: [EmployeeService],
})
export class EmployeeModule {}
