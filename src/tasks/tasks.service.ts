import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';

import { TaskModel, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: TaskModel[] = [];

  getAllTasks(): TaskModel[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): TaskModel[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  getTaskById(id: string): TaskModel {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
    return found;
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
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }

  updateTaskStatus(id: string, status: TaskStatus): TaskModel {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
