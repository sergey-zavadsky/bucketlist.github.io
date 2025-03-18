import { fetchWithAuth } from '../config/api';

export const deleteTodo = async (id) => {
	return fetchWithAuth(`todos/${id}`, {
		method: 'DELETE',
	});
};
