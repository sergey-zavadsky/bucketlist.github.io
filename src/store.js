import { configureStore } from '@reduxjs/toolkit';
import { inputReducer } from './components/reducers/input';

export default configureStore({
	reducer: {
		inputState: inputReducer,
	},
});
