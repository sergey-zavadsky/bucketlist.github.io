import { fetchWithAuth } from '../config/api';

export const addTodo = async (value) => {
	return fetchWithAuth('todos', {
		method: 'POST',
		body: JSON.stringify({ text: value }),
	});
};
