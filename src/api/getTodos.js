export const getTodos = async () => {
	return await fetch(`http://localhost:3000/api/v1/todos`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	}).then((resp) => resp.json());
};
