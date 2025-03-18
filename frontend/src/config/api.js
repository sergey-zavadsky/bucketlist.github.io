export const API_BASE_URL =
	import.meta.env.MODE === 'production'
		? '/api/v1'
		: 'http://localhost:3000/api/v1';

export const fetchWithAuth = async (endpoint, options = {}) => {
	const url = `${API_BASE_URL}/${endpoint}`;

	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + localStorage.getItem('token'),
		...options.headers,
	};

	const config = {
		...options,
		headers,
	};

	const response = await fetch(url, config);
	return response.json();
};
