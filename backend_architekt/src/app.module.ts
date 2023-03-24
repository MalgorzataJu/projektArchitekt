import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EmployeeModule } from './employee/employee.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { KindOfWorkModule } from './kind-of-work/kind-of-work.module';
import { HourModule } from "./hour/hour.module";

@Module({
  imports: [
    DatabaseModule,
    EmployeeModule,
    ProjectModule,
    KindOfWorkModule,
    TaskModule,
    HourModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
