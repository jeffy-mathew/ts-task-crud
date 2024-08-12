import { Model, DataTypes, Sequelize } from 'sequelize';

export interface Task {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
}

export class TaskModel extends Model<Task> implements Task {
  public id!: number;
  public title!: string;
  public description!: string;
  public completed!: boolean;

  static initialize(sequelize: Sequelize): void {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        completed: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      { sequelize, tableName: 'tasks' }
    );
  }
}