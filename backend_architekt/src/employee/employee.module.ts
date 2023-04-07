import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from '../entities/Profile.entity';
import { EmployeeEntity } from '../entities/Employee.entity';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmployeeEntity,
      ProfileEntity,
      // KindOfWorkEntity,
      // ProfileEntity,
      // TaskEntity,
      // HourEntity,
    ]),
  ],
  providers: [EmployeeService],
  controllers: [EmployeeController],
  exports: [EmployeeService],
})
export class EmployeeModule {}
