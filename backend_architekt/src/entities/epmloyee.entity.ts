
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {ProfileEntity} from "./Profile.entity";
import {HourEntity} from "./Hour.entity";
import {TaskEntity} from "./Task.entity";


@Entity({name: 'employees'})
export class EmployeeEntity extends BaseEntity{
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
        type: 'timestamp'
    })
    createdAt: Date;

    @Column({nullable:true})
    authStrategy: string;

    @OneToOne((type)=> ProfileEntity)
    @JoinColumn()
    profile:ProfileEntity;

    @OneToMany(type => HourEntity, entity => entity.employee.id)
    @JoinTable()
    hour:HourEntity[];

    @OneToMany(type => TaskEntity, entity => entity.employees.id)
    @JoinTable()
    tasks:TaskEntity[]

}