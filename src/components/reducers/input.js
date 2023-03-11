const initialState = {
	value: [
		{
			id: 1,
			title: 'Serega',
		},
		{
			id: 2,
			title: 'Garik',
		},
		{
			id: 3,
			title: 'Петро',
		},
	],
};

const inputReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD':
			return {
				...state,
				value: [...state.value, action.data],
			};
		case 'DELETE':
			return {
				...state,
				value: state.value.filter((el) => el.id !== action.id),
			};
		default:
			return state;
	}
};

const addTitle = (data) => {
	return {
		type: 'ADD',
		data,
	};
};

const deleteTitle = (id) => {
	return {
		type: 'DELETE',
		id,
	};
};

export { inputReducer, addTitle, deleteTitle };
