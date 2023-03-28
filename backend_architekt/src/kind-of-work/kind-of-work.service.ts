import { Injectable } from '@nestjs/common';
import { KindOfWorkEntity } from '../entities/Kind-of-work.entity';
import { CreateKindofworkDto } from "./dto/createKindofwork.dto";
import { KindOfWorkItemEntity } from "../utils/types";

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
