import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { ProjectService } from './project.service';
import { ListProjectSimpleResAll } from "../utils/types";
import { CreateProjectDto } from "./dto/createProject.dto";
import { UpdateProjectDto } from "./dto/updateProject.dto";

@Controller('/project')
export class ProjectController {
  constructor(@Inject(ProjectService) private projectService: ProjectService) {}

  @Get('/')
  getProject(): Promise<ListProjectSimpleResAll> {
    return this.projectService.listAll();
  }

  @Post('/')
  createProject(@Body() newProject: CreateProjectDto) {
    return this.projectService.createProject(newProject);
  }

  @Put('/:id')
  updateProjectById(
    @Param('id') id: string,
    @Body() updateProject: UpdateProjectDto,
  ) {
    this.projectService.updateProject(id, updateProject);
  }
  @Delete('/:id')
  deleteProjectById(@Param('id') id: string) {
    this.projectService.deleteProject(id);
  }
}
