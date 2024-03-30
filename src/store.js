import { configureStore } from '@reduxjs/toolkit';
import { inputReducer } from './components/reducers/input';
import { languageSwitcherReducer } from './components/reducers/languageSwitcher/languageSwitcherReducer';

export default configureStore({
	reducer: {
		inputState: inputReducer,
		switchLanguage: languageSwitcherReducer,
	},
});
