import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KindOfWorkEntity } from '../entities/Kind-of-work.entity';
import { CreateKindofworkDto } from "./dto/createKindofwork.dto";
import { KindOfWorkItemEntity } from "../utils/types";

@Injectable()
export class KindOfWorkService {
  constructor(
    @InjectRepository(KindOfWorkEntity)
    private kindOfWorkRepository: Repository<KindOfWorkEntity>,
  ) {}

  async findKindOfWork() {
    return await KindOfWorkEntity.find();
  }

  async createKindOfWork(kindofWork: CreateKindofworkDto): Promise<CreateKindofworkDto> {
    const newKinofwork = this.kindOfWorkRepository.create({
      ...kindofWork,
    });
    console.log(newKinofwork);
    return this.kindOfWorkRepository.save(newKinofwork);
  }

  async updateKindOfWork(id: string, updatenewKindofWorkDetail: KindOfWorkItemEntity) {
    return await this.kindOfWorkRepository.update(
      { id },
      { ...updatenewKindofWorkDetail },
    );
  }

  async deleteKindOfWork(id: string) {
    return await this.kindOfWorkRepository.delete({ id });
  }
}
