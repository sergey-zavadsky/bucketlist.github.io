import { fetchWithAuth } from '../config/api';

export const updateTodo = async (textValue, id, isDone) => {
	return fetchWithAuth(`todos/${id}`, {
		method: 'PATCH',
		body: JSON.stringify({ text: textValue, isDone: isDone }),
	});
};
