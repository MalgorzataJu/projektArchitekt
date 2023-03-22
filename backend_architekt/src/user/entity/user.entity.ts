import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'users'})
export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column({
        length: 255,
    })
    password: string;

    @CreateDateColumn({
        nullable: true,
        type: 'timestamp' })
    createdAt: Date;

}