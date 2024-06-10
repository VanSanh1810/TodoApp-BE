import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from 'src/task/dtos/CreateTask.dto';
import { UpdateTaskDto } from 'src/task/dtos/UpdateTask.dto';
import { TaskService } from 'src/task/services/task/task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async getAllTasks() {
    return await this.taskService.getAllTasks();
  }

  @Get(':id')
  async getSingleTasks(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.getSingleTask(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createTask(@Body() taskData: CreateTaskDto) {
    return await this.taskService.createTask(taskData);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateTask(@Body() taskData: UpdateTaskDto, @Param('id') id: number) {
    return await this.taskService.updateTask(taskData, id);
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.deleteTask(id);
  }
}
