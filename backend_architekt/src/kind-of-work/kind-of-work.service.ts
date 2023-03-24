import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KindOfWorkEntity } from '../entities/Kind-of-work.entity';
import { CreateKindofworkDto } from "./dto/createKindofwork.dto";
import { KindOfWorkItemEntity } from "../utils/types";
import { ProjectEntity } from "../entities/Project.entity";

@Injectable()
export class KindOfWorkService {

  async findKindOfWork() {
    return await KindOfWorkEntity.find();
  }

  async getOneKindOfWork(id: string): Promise<KindOfWorkEntity> {
    return KindOfWorkEntity.findOne({ where: { id } });
  }
  async createKindOfWork(kindofWork: CreateKindofworkDto): Promise<CreateKindofworkDto> {
    const newKinofwork = KindOfWorkEntity.create({
      ...kindofWork,
    });
    console.log(newKinofwork);
    return KindOfWorkEntity.save(newKinofwork);
  }

  async updateKindOfWork(id: string, updatenewKindofWorkDetail: KindOfWorkItemEntity) {
    return await KindOfWorkEntity.update(
      { id },
      { ...updatenewKindofWorkDetail },
    );
  }

  async deleteKindOfWork(id: string) {
    return await KindOfWorkEntity.delete({ id });
  }
}
