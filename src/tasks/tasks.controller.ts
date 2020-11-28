import { Controller, Get } from '@nestjs/common';

import { TasksService } from './tasks.service';
import { TaskModel } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllRAsks(): TaskModel[] {
    return this.tasksService.getAllTasks();
  }
}
