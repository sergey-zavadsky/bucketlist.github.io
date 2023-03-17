const initialState = {
	isMaxValue: 100,
};

const completeToGoReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_MAX':
			return {
				...state,
				isMaxValue: action.payload,
			};
		default:
			return state;
	}
};

const completeToGoAction = (payload) => {
	return { type: 'SET_MAX', payload };
};

export { completeToGoReducer, completeToGoAction };
