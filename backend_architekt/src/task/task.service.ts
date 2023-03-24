import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../entities/Task.entity';
import { Repository } from 'typeorm';
import { ListTaskResAll } from '../utils/types';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Injectable()
export class TaskService {
  @InjectRepository(TaskEntity)
  private taskRepository: Repository<TaskEntity>;

  async listAll(): Promise<ListTaskResAll> {
    const tasks = TaskEntity.find({
      relations: ['project', 'employees'],
    });
    return tasks;
  }

  async getOneTask(id: string): Promise<TaskEntity> {
    return TaskEntity.findOne({ where: { id } });
  }

  createTask(task: CreateTaskDto) {
    const newTask = this.taskRepository.create({
      ...task,
      startDate: new Date(),
      endDate: new Date(),
    });

    return this.taskRepository.save(newTask);
  }

  async updateTask(id: string, updateTask: UpdateTaskDto) {
    return await this.taskRepository.update({ id }, { ...updateTask });
  }

  async deleteTask(id: string) {
    return await this.taskRepository.delete({ id });
  }
}
