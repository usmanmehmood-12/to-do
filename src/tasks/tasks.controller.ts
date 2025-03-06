import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTask(
    @Body() body: { title: string; description: string; deadline: Date },
    @Request() req: { user: User },
  ) {
    return this.tasksService.createTask(
      body.title,
      body.description,
      body.deadline,
      req.user.id,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  /**
   * Finds all tasks for the given user.
   * @param req The request object containing the user making the request.
   * @returns A promise that resolves with an array of tasks associated with the given user.
   */
  async getUserTasks(@Request() req: { user: User }) {
    return this.tasksService.getUserTasks(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  /**
   * Updates a task in the database by its ID.
   * @param id The ID of the task to update.
   * @param body The body of the request with the title, description, and completion status of the task.
   * @returns A promise that resolves with a message indicating that the task was updated successfully.
   */
  async updateTaskStatus(
    @Param('id') id: number,
    @Body() body: { title: string; description: string; isCompleted: boolean },
  ) {
    await this.tasksService.updateTaskStatus(
      id,
      body.title,
      body.description,
      body.isCompleted,
    );
    return { message: 'Task updated successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return 'Hello Task';
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  /**
   * Deletes a task in the database by its ID.
   * @param id The ID of the task to delete.
   * @returns A promise that resolves with a message indicating that the task was deleted successfully.
   */
  async deleteTask(@Param('id') id: number) {
    await this.tasksService.deleteTask(id);
    return { message: 'Task deleted successfully' };
  }
}
