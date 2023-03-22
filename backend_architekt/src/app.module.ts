import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./user/entity/user.entity";
import {UserModule} from "./user/user.module";
import {DatabaseModule} from "./database/database.module";

@Module({
  imports: [ DatabaseModule, UserModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
