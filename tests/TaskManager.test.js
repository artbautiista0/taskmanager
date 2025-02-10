import { TaskManager } from '../src/TaskManager.js';
import { TaskService } from '../src/TaskService.js';

jest.mock('../src/TaskService'); // Mocks TaskService para no hacer peticiones reales

describe('TaskManager', () => {
    let taskManager;

    beforeEach(() => {
        const body = document.body;
        const taskList = document.createElement('ul');
        taskList.id = 'taskList';
        body.appendChild(taskList);
        taskManager = new TaskManager();
    });

    afterEach(() => {
        // Limpia cualquier estado que se haya acumulado entre tests
        jest.clearAllMocks(); // Restablece todos los mocks
    });

    test('should add a task', async () => {
        const task = { id: 1, name: 'Test Task', status: false };
        TaskService.addTask.mockResolvedValue(task); // Mocking the response

        await taskManager.addTask(task);

        // Check if task was added correctly
        expect(taskManager.tasks).toHaveLength(1);
        expect(taskManager.tasks[0]).toEqual(task);
    });

    test('should delete a task', async () => {
        const task = { id: 1, name: 'Test Task', status: false };
        taskManager.tasks = [task];
        TaskService.deleteTask.mockResolvedValue(undefined); // Mocking the delete response

        await taskManager.deleteTask(1);

        // Check if task was removed
        expect(taskManager.tasks).toHaveLength(0);
    });

    test('should handle adding an invalid task', async () => {
        const invalidTask = {}; // Invalid task

        await taskManager.addTask(invalidTask);

        // Check if task was not added
        expect(taskManager.tasks).toHaveLength(0);
    });

    test('should call TaskService.editTask when valid task name is provided', async () => {
        const taskId = 1;
        const taskName = 'Updated Task';

        // Mock de la respuesta de TaskService.editTask
        TaskService.editTask.mockResolvedValue({ id: taskId, name: taskName });

        // Llamar a handleEdit
        await taskManager.handleEdit(taskId, taskName);

        // Verificar que TaskService.editTask fue llamado con los parámetros correctos
        expect(TaskService.editTask).toHaveBeenCalledWith(taskId, taskName);
    });

    test('should not call TaskService.editTask when invalid task name is provided', async () => {
        const taskId = 1;
        const taskName = ''; // Nombre inválido

        // Llamar a handleEdit
        await taskManager.handleEdit(taskId, taskName);

        // Verificar que TaskService.editTask no fue llamado
        expect(TaskService.editTask).not.toHaveBeenCalled();
    });
});
