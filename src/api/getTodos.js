export const getTodos = async () => {
	return await fetch(`http://localhost:3000/api/v1/todos`).then((resp) =>
		resp.json(),
	);
};
