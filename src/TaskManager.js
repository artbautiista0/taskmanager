import { TaskService } from './TaskService.js';

export class TaskManager {
    constructor() {
        this.tasks = [];
    }

    async fetchTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '<p>Cargando tareas...</p>';
    
        try {
            this.tasks = await TaskService.fetchTasks() || [];
            this.displayTasks();
        } catch (error) {
            console.error('Error fetching tasks:', error);
            taskList.innerHTML = '<p>Error al cargar las tareas.</p>';
        }
    }

    async addTask(task) {
        if (!task || typeof task !== 'object' || !task.name) {
            console.error('Invalid task');
            return;
        }

        const newTask = await TaskService.addTask(task);
        if (newTask) {
            this.tasks.push(newTask);
            this.displayTasks();
        }
    }

    async deleteTask(taskId) {
        await TaskService.deleteTask(taskId);
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.displayTasks();
    }

    toggleEditState(taskId) {
        const input = document.getElementById(`input${taskId}`);
        const button = document.getElementById(`btn${taskId}`);
        
        if (input.disabled) {
            input.disabled = false;
            button.textContent = 'Save';
        } else {
            input.disabled = true;
            button.textContent = 'Edit';
        }
    }

    async handleEdit(taskId, taskName) {
        if (taskName.trim() === "" ) {
            console.error("Invalid task name");
            return;
        }
        await TaskService.editTask(taskId, taskName); 
    }

    async editTask(taskId) {
        const input = document.getElementById(`input${taskId}`);
        const taskName = input.value.trim();
    
        if (taskName === "") {
            console.error("Invalid task name");
            return;
        }
    
        this.toggleEditState(taskId);
    
        if (input.disabled) {
            await this.handleEdit(taskId, taskName);
            const updatedTask = await TaskService.fetchTask(taskId);
            this.tasks = this.tasks.map(task => task.id === taskId ? updatedTask : task);
            this.displayTasks();
        }
    }

    async completedTask(taskId) {
        const status = document.getElementById(`status${taskId}`);
        const isCompleted = status.textContent === 'Completed';
        await TaskService.updateStatus(taskId, isCompleted ? 1 : 0);
        await this.fetchTasks();
    }

    renderTask(task) {
        return `
            <div class="task-item ${task.status ? 'completed' : ''}">
                <div class="task-info">
                    <span>Task ID: ${task.id}</span>
                    <input id='input${task.id}' disabled type='text' value='${task.name}' />
                    <span>Status: ${task.status ? 'Completed' : 'Pending'}</span>
                </div>
                <div class="task-actions">
                    <button id='status${task.id}'>${task.status ? 'Undo' : 'Completed'}</button>
                    <button id='btn${task.id}'>Edit</button>
                    <button id='delete${task.id}'>Delete</button>
                </div>
            </div>`;
    }

    renderTasks() {
        return this.tasks.map(task => this.renderTask(task)).join('');
    }

    displayTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = this.tasks.length > 0 ? this.renderTasks() : '<p>No hay tareas disponibles.</p>';
    }
}