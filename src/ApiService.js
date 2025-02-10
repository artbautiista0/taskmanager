const api = 'http://localhost:3000';

export class ApiService {
    static async request(endpoint, method = 'GET', data = null) {
        const options = { method, headers: { 'Content-Type': 'application/json' } };
        if (data) options.body = JSON.stringify(data);

        try {
            const response = await fetch(`${api}/${endpoint}`, options);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error ${method} ${endpoint}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error ${method} ${endpoint}:`, error);
            return null;
        }
    }
}