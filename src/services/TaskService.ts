import { Task } from '../models/Task';
import { TaskRepository } from '../repositories/TaskRepository';

export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    return await this.taskRepository.create(task);
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.findAll();
  }

  async getTaskById(id: number): Promise<Task | null> {
    return await this.taskRepository.findById(id);
  }

  async updateTask(id: number, task: Partial<Task>): Promise<Task | null> {
    return await this.taskRepository.update(id, task);
  }

  async deleteTask(id: number): Promise<boolean> {
    return await this.taskRepository.delete(id);
  }
}
