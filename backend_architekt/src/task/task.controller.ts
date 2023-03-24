import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/createTask.dto";
import { UpdateTaskDto } from "./dto/updateTask.dto";
import { ListTaskResAll } from "../utils/types";


@Controller('/task')
export class TaskController {
  constructor(@Inject(TaskService) private taskService: TaskService) {
  }

  @Get('/')
  getTask(): Promise<ListTaskResAll> {
    return this.taskService.listAll();
  }

  @Post('/')
  createTask(@Body() newTask: CreateTaskDto) {
    return this.taskService.createTask(newTask);
  }

  @Put('/:id')
  updateTasktById(
    @Param('id') id: string,
    @Body() updateTask: UpdateTaskDto,
  ) {
    this.taskService.updateTask(id, updateTask);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string) {
    this.taskService.deleteTask(id);
  }
}