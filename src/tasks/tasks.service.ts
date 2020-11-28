import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';

import { TaskModel, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: TaskModel[] = [];

  getAllTasks(): TaskModel[] {
    return this.tasks;
  }

  getTaskById(id: string): TaskModel {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(CreateTaskDto: CreateTaskDto): TaskModel {
    const { title, description } = CreateTaskDto;
    const task: TaskModel = {
      title,
      description,
      status: TaskStatus.OPEN,
      id: uuid(),
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): TaskModel {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
