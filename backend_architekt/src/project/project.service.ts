import { Injectable } from '@nestjs/common';
import { ProjectEntity } from '../entities/Project.entity';
import { ListProjectResAll } from '../utils/types';
import { CreateProjectDto } from "./dto/createProject.dto";
import { UpdateProjectDto } from "./dto/updateProject.dto";

@Injectable()
export class ProjectService {

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
    const newProject = ProjectEntity.create({
      ...project,
      createdAt: new Date(),
    });

    return ProjectEntity.save(newProject);
  }

  async updateProject(id: string, updateProject: UpdateProjectDto) {
    return await ProjectEntity.update({ id }, { ...updateProject });
  }

  async deleteProject(id: string) {
    return await ProjectEntity.delete({ id });
  }
}
