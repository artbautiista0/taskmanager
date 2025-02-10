import { ApiService } from './ApiService.js';

const ENDPOINTS = {
    GET_TASKS: 'getTasks',
    ADD_TASK: 'addTask',
    DELETE_TASK: 'deleteTask',
    EDIT_TASK: 'editTask',
    UPDATE_STATUS: 'updateStatus'
};

export class TaskService {
    static async fetchTasks() {
        return await ApiService.request(ENDPOINTS.GET_TASKS);
    }

    static async addTask(task) {
        if (!task || typeof task !== 'object' || !task.name) {
            console.error('Invalid task');
            return null;
        }
        return await ApiService.request(ENDPOINTS.ADD_TASK, 'POST', task);
    }

    static async deleteTask(taskId) {
        await ApiService.request(`${ENDPOINTS.DELETE_TASK}/${taskId}`, 'DELETE');
    }

    static async editTask(taskId, name) {
        if (!taskId || !name || typeof name !== 'string') {
            console.error('Invalid task ID or name');
            return;
        }
        await ApiService.request(`${ENDPOINTS.EDIT_TASK}/${taskId}`, 'PUT', { name });
    }

    static async updateStatus(taskId, status) {
        await ApiService.request(`${ENDPOINTS.UPDATE_STATUS}/${taskId}`, 'PUT', { status });
    }
}