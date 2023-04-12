import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { ProjectService } from './project.service';
import { ListProjectSimpleResAll, ProjectItemEntity, ProjectSimpleRes } from "../utils/types";
import { CreateProjectDto } from "./dto/createProject.dto";
import { UpdateProjectDto } from "./dto/updateProject.dto";
import { AuthGuard } from "@nestjs/passport";
import { MyTimeoutInterceptor } from "../interceptors/my-timeout.interceptor";

@Controller('/project')
// @UseGuards(AuthGuard('jwt'))
export class ProjectController {
  constructor(@Inject(ProjectService) private projectService: ProjectService) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(MyTimeoutInterceptor)
  getProject(): Promise<ListProjectSimpleResAll> {
    return this.projectService.listAll();
  }

  @Get('/:id')
  getOneProject(
    @Param('id') id: string,
  ): Promise<ProjectItemEntity> {
    return this.projectService.getOneProject(id);
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
