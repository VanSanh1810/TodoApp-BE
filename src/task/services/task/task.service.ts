import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from 'src/task/dtos/CreateTask.dto';
import { UpdateTaskDto } from 'src/task/dtos/UpdateTask.dto';
import { TaskEntity } from 'src/typeorm/entities/Task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async createTask(taskData: CreateTaskDto) {
    return this.taskRepository.create({
      title: taskData.title,
      desc: taskData.desc,
      startDate: taskData.startDate ? taskData.startDate : new Date(),
      endDate: taskData.endDate ? taskData.endDate : null,
      status: !!taskData.status,
      finishDate: taskData.finishDate ? taskData.finishDate : null,
    });
  }

  async getAllTasks() {
    return await this.taskRepository.find();
  }
  async getSingleTask(id: number) {
    return await this.taskRepository.findBy({ id: id });
  }

  async updateTask(taskData: UpdateTaskDto, id: number) {
    const taskToUpDate = await this.taskRepository.findOneBy({ id: id });

    if (!taskToUpDate) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    if (taskData.status !== undefined) {
      taskToUpDate.status = taskData.status;
    }
    if (taskData.title) {
      taskToUpDate.title = taskData.title;
    }
    if (taskData.desc) {
      taskToUpDate.status = taskData.status;
    }
    if (taskData.startDate) {
      taskToUpDate.startDate = taskData.startDate;
    }
    if (taskData.endDate) {
      taskToUpDate.endDate = taskData.endDate;
    }

    if (taskData.finishDate) {
      taskToUpDate.finishDate = taskData.finishDate;
    }

    return await this.taskRepository.update(taskToUpDate.id, {
      ...taskToUpDate,
    });
  }

  async deleteTask(id: number) {
    return await this.taskRepository.delete({ id: id });
  }
}
