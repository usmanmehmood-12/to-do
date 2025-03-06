import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}
  async createTask(
    title: string,
    description: string,
    deadline: Date,
    user: any,
  ) {
    const task = this.tasksRepository.create({
      title,
      description,
      deadline,
      user,
    });

    return await this.tasksRepository.save(task);
  }

  async getUserTasks(userId: number): Promise<Task[]> {
    return await this.tasksRepository.find({ where: { user: { id: userId } } });
  }

  async updateTaskStatus(
    taskId: number,
    title: string,
    description: string,
    isCompleted: boolean,
  ): Promise<void> {
    // @ts-ignore
    return await this.tasksRepository.update(taskId, {
      title,
      description,
      isCompleted,
    });
  }

  /**
   * Deletes a task from the database by its ID.
   * @param id - The ID of the task to be deleted.
   * @returns A promise that resolves when the task is successfully deleted.
   */

  async deleteTask(id: number) {
    return await this.tasksRepository.delete(id);
  }
}
