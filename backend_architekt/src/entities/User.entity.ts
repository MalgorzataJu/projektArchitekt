
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {ProfileEntity} from "./Profile.entity";


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
        type: 'timestamp'
    })
    createdAt: Date;

    @Column({nullable:true})
    authStrategy: string;

    @OneToOne((type)=> ProfileEntity)
    @JoinColumn()
    profile:ProfileEntity;
}