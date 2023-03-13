const initialState = {
	currentLanguage: 'BY',
};

const languageSwitcherReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SWITCH_LANGUAGE':
			return {
				...state,
				currentLanguage: action.payload,
			};
		default:
			return state;
	}
};

const switchLanguage = (languageCode) => ({
	type: 'SWITCH_LANGUAGE',
	payload: languageCode,
});

export { languageSwitcherReducer, switchLanguage };
