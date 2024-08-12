import { Express } from 'express';
import { TaskController } from '../controllers/TaskController';

export class TaskRoutes {
  constructor(private taskController: TaskController) {}

  registerRoutes(app: Express): void {
    app.post('/tasks', this.taskController.createTask.bind(this.taskController));
    app.get('/tasks', this.taskController.getAllTasks.bind(this.taskController));
    app.get('/tasks/:id', this.taskController.getTaskById.bind(this.taskController));
    app.put('/tasks/:id', this.taskController.updateTask.bind(this.taskController));
    app.delete('/tasks/:id', this.taskController.deleteTask.bind(this.taskController));
  }
}