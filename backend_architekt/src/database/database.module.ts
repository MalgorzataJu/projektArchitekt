import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UserEntity} from "../user/entity/user.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'megakurs_projekt',
            bigNumberStrings: false,
            entities: [],
            autoLoadEntities: true,
            synchronize: true,
            logging: true,
        }),
    ],
})
export class DatabaseModule {}