export const updateTodo = async (textValue, id, isDone) => {
	return await fetch(`http://localhost:3000/api/v1/todos/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ text: textValue, isDone: isDone }),
	}).then((resp) => resp.json());
};
