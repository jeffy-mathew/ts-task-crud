// src/__tests__/integration/TaskRoutes.test.ts
import request from 'supertest';
import express from 'express';
import { TaskRepository } from '../../repositories/TaskRepository';
import { TaskService } from '../../services/TaskService';
import { TaskController } from '../../controllers/TaskController';
import { TaskRoutes } from '../../routes/TaskRoutes';
import sequelize from '../../db/sequelize';

const app = express();
app.use(express.json());

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);
const taskRoutes = new TaskRoutes(taskController);

taskRoutes.registerRoutes(app);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Task Routes', () => {
  it('should create a new task', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Test Task');
  });

  it('should get all tasks', async () => {
    const response = await request(app).get('/tasks');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('should get a task by id', async () => {
    const createResponse = await request(app)
      .post('/tasks')
      .send({
        title: 'Task to Get',
        description: 'Description',
        completed: false,
      });

    const taskId = createResponse.body.id;

    const getResponse = await request(app).get(`/tasks/${taskId}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body.id).toBe(taskId);
    expect(getResponse.body.title).toBe('Task to Get');
  });

  it('should update a task', async () => {
    const createResponse = await request(app)
      .post('/tasks')
      .send({
        title: 'Task to Update',
        description: 'Description',
        completed: false,
      });

    const taskId = createResponse.body.id;

    const updateResponse = await request(app)
      .put(`/tasks/${taskId}`)
      .send({
        title: 'Updated Task',
        completed: true,
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.title).toBe('Updated Task');
    expect(updateResponse.body.completed).toBe(true);
  });

  it('should delete a task', async () => {
    const createResponse = await request(app)
      .post('/tasks')
      .send({
        title: 'Task to Delete',
        description: 'Description',
        completed: false,
      });

    const taskId = createResponse.body.id;

    const deleteResponse = await request(app).delete(`/tasks/${taskId}`);

    expect(deleteResponse.status).toBe(204);

    const getResponse = await request(app).get(`/tasks/${taskId}`);
    expect(getResponse.status).toBe(404);
  });
});