const initialState = {
	value: [
		{
			12: {
				_id: '64459996a368e94b464bddd6',
				createdDate: '2023-04-23T20:48:22.832Z',
				text: 'new doka3',
			},
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
