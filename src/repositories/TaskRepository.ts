import { Task, TaskModel } from '../models/Task';
import { Sequelize } from 'sequelize';

export class TaskRepository {
  constructor(sequelize: Sequelize) {
    TaskModel.initialize(sequelize);
  }
    
  async create(task: Omit<Task, 'id'>): Promise<Task> {
    return await TaskModel.create(task);
  }

  async findAll(): Promise<Task[]> {
    return await TaskModel.findAll();
  }

  async findById(id: number): Promise<Task | null> {
    return await TaskModel.findByPk(id);
  }

  async update(id: number, task: Partial<Task>): Promise<Task | null> {
    const [affectedCount, affectedRows] = await TaskModel.update(task, {
      where: { id },
      returning: true,
    });
    return affectedCount > 0 ? affectedRows[0] : null;
  }

  async delete(id: number): Promise<boolean> {
    const deletedCount = await TaskModel.destroy({ where: { id } });
    return deletedCount > 0;
  }
}