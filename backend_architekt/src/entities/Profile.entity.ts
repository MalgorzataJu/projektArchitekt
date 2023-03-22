import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "./User.entity";

@Entity({name: 'user_profile'})
export class ProfileEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    hourly: number;
    
}