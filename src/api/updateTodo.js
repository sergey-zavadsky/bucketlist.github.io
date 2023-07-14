export const updateTodo = async (value, id) => {
	return await fetch(`http://localhost:3000/api/v1/todos/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ text: value }),
	}).then((resp) => resp.json());
};
