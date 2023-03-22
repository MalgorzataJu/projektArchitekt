import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";
import {ProfileEntity} from "../entities/Profile.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, ProfileEntity]),
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
