import {BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'users_profile'})
export class ProfileEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({
        nullable:true,
    })
    hourly: number;

}