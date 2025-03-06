import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  /**
   * Injects the TaskRepository into the TasksService.
   * @param tasksRepository The TypeORM Repository for the Task entity.
   */
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}
  /**
   * Creates a new task for the given user.
   * @param title The title of the task.
   * @param description The description of the task.
   * @param deadline The deadline of the task.
   * @param user The user to create the task for.
   * @returns The newly created task.
   */
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

  /**
   * Finds all tasks for a given user.
   * @param userId The ID of the user whose tasks to find.
   * @returns A promise that resolves with an array of tasks associated with the given user.
   */
  async getUserTasks(userId: number): Promise<Task[]> {
    return await this.tasksRepository.find({ where: { user: { id: userId } } });
  }

  /**
   * Updates a task in the database by its ID.
   * @param taskId The ID of the task to update.
   * @param title The new title of the task.
   * @param description The new description of the task.
   * @param isCompleted The new completion status of the task.
   * @returns A promise that resolves once the task is updated.
   */
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
