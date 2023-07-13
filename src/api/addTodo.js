export const addTodo = async (value) => {
	return await fetch(`http://localhost:3000/api/v1/todos`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ text: value }),
	}).then((resp) => resp.json());
};
