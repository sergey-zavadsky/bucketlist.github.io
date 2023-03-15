const initialState = {
	isMaxValue: 100,
};

const completeToGoReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_MAX':
			return {
				...state,
				maxValue: action.payload,
			};
		default:
			return state;
	}
};

const completeToGoAction = (maxValue) => ({
	type: 'SET_MAX',
	payload: maxValue,
});

export { completeToGoReducer, completeToGoAction };
