import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from '../entities/Project.entity';
import { ListProjectResAll } from '../utils/types';
import { CreateProjectDto } from "./dto/createProject.dto";
import { UpdateProjectDto } from "./dto/updateProject.dto";

@Injectable()
export class ProjectService {
  @InjectRepository(ProjectEntity)
  private projectRepository: Repository<ProjectEntity>;

  async listAll(): Promise<ListProjectResAll> {
    const projects = ProjectEntity.find({
      // relations: ['tasks'],
    });
    return projects;
  }

  async getOneProject(id: string): Promise<ProjectEntity> {
    return ProjectEntity.findOne({ where: { id } });
  }

  createProject(project: CreateProjectDto) {
    const newProject = this.projectRepository.create({
      ...project,
      createdAt: new Date(),
    });

    return this.projectRepository.save(newProject);
  }

  async updateProject(id: string, updateProject: UpdateProjectDto) {
    return await this.projectRepository.update({ id }, { ...updateProject });
  }

  async deleteProject(id: string) {
    return await this.projectRepository.delete({ id });
  }
}
