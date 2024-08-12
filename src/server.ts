import express from 'express';
import { TaskRepository } from './repositories/TaskRepository';
import { TaskService } from './services/TaskService';
import { TaskController } from './controllers/TaskController';
import { TaskRoutes } from './routes/TaskRoutes';
import sequelize from './db/sequelize';

const app = express();
app.use(express.json());

const taskRepository = new TaskRepository(sequelize);
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

// Set up routes
const taskRoutes = new TaskRoutes(taskController);
taskRoutes.registerRoutes(app);

const PORT = process.env.PORT || 3001;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});