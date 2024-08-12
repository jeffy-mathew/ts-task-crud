import { TaskService } from '../../services/TaskService';
import { TaskRepository } from '../../repositories/TaskRepository';
import { Task } from '../../models/Task';

// Mock the TaskRepository
jest.mock('../../repositories/TaskRepository');

describe('TaskService', () => {
  let taskService: TaskService;
  let mockTaskRepository: jest.Mocked<TaskRepository>;

  beforeEach(() => {
    mockTaskRepository = new TaskRepository() as jest.Mocked<TaskRepository>;
    taskService = new TaskService(mockTaskRepository);
  });

  describe('createTask', () => {
    it('should create a task', async () => {
      const taskData: Omit<Task, 'id'> = {
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
      };
      const createdTask: Task = { id: 1, ...taskData };
      mockTaskRepository.create.mockResolvedValue(createdTask);

      const result = await taskService.createTask(taskData);

      expect(mockTaskRepository.create).toHaveBeenCalledWith(taskData);
      expect(result).toEqual(createdTask);
    });
  });

  describe('getAllTasks', () => {
    it('should return all tasks', async () => {
      const tasks: Task[] = [
        { id: 1, title: 'Task 1', description: 'Description 1', completed: false },
        { id: 2, title: 'Task 2', description: 'Description 2', completed: true },
      ];
      mockTaskRepository.findAll.mockResolvedValue(tasks);

      const result = await taskService.getAllTasks();

      expect(mockTaskRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(tasks);
    });
  });

  describe('getTaskById', () => {
    it('should return a task by id', async () => {
      const task: Task = { id: 1, title: 'Task 1', description: 'Description 1', completed: false };
      mockTaskRepository.findById.mockResolvedValue(task);

      const result = await taskService.getTaskById(1);

      expect(mockTaskRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(task);
    });

    it('should return null if task not found', async () => {
      mockTaskRepository.findById.mockResolvedValue(null);

      const result = await taskService.getTaskById(1);

      expect(mockTaskRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toBeNull();
    });
  });

});