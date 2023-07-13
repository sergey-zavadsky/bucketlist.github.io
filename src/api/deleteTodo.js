export const deleteTodo = async (value) => {
	return await fetch(`http://localhost:3000/api/v1/todos/${value}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	}).then((resp) => resp.json());
};
