import { TaskManager } from './TaskManager.js';

document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new TaskManager();

    // Evento para agregar una nueva tarea
    document.getElementById('taskForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const taskName = document.getElementById('taskName').value;
        if (taskName.trim()) {
            await taskManager.addTask({ name: taskName });
            document.getElementById('taskName').value = '';
        }
    });

    // Configurar eventos para los botones de las tareas
    document.getElementById('taskList').addEventListener('click', async function(event) {
        if (event.target.matches('[id^="status"]')) {
            const taskId = event.target.id.replace('status', '');
            await taskManager.completedTask(taskId);
        }
        if (event.target.matches('[id^="btn"]')) {
            const taskId = event.target.id.replace('btn', '');
            await taskManager.editTask(taskId);
        }
        if (event.target.matches('[id^="delete"]')) {
            const taskId = event.target.id.replace('delete', '');
            await taskManager.deleteTask(taskId);
        }
    });

    // Cargar las tareas al iniciar la página
    taskManager.fetchTasks();
});