import {
  BaseEntity,
  Column,
  Entity, JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { HourEntity } from './Hour.entity';
import { KindOfWorkItemEntity } from '../utils/types';

@Entity({ name: 'kinds_of_work' })
export class KindOfWorkEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 50,
  })
  hourstype: string;

  @OneToMany((type) => HourEntity, (entity) => entity.kindofwork.id)
  @JoinTable()
  hours: HourEntity[];
}
