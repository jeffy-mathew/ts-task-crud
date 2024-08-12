import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

export class TaskController {
  constructor(private taskService: TaskService) {}

  async createTask(req: Request, res: Response): Promise<void> {
    const task = await this.taskService.createTask(req.body);
    res.status(201).json(task);
  }

  async getAllTasks(req: Request, res: Response): Promise<void> {
    const tasks = await this.taskService.getAllTasks();
    res.json(tasks);
  }

  async getTaskById(req: Request, res: Response): Promise<void> {
    const task = await this.taskService.getTaskById(Number(req.params.id));
    if (task) {
      res.json(task);
    } else {
      res.status(404).send('Task not found');
    }
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    const task = await this.taskService.updateTask(Number(req.params.id), req.body);
    if (task) {
      res.json(task);
    } else {
      res.status(404).send('Task not found');
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    const success = await this.taskService.deleteTask(Number(req.params.id));
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).send('Task not found');
    }
  }
}