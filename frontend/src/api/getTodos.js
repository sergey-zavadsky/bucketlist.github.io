import { fetchWithAuth } from '../config/api';

export const getTodos = async () => {
	return fetchWithAuth('todos', {
		method: 'GET',
	});
};
