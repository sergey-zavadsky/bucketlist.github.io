import { useState } from 'react';
import './slider.css';
import { useSelector, useDispatch } from 'react-redux';
import { completeToGoAction } from '../reducers/completeToGo/completeToGoReducer';

const Slider = () => {
	const [currentSliderValue, setCurrentSliderValue] = useState(50);

	// const sliderHandler = (e) => {
	// 	console.log(e);
	// 	setCurrentSliderValue(e);
	// };

	const isMax = useSelector((state) => {
		return state.completeToGoState?.isMaxValue;
	});
	const dispatch = useDispatch;

	const sliderReducerHandler = (sliderValue) => {
		dispatch(completeToGoAction(sliderValue.target.value));
	};

	return (
		<div className="slidecontainer">
			<p>Custom range slider:</p>
			<input
				type="range"
				min="1"
				max={isMax}
				value={currentSliderValue}
				step={1}
				className="slider"
				id="myRange"
				// onChange={(e) => sliderHandler(e.target?.value)}
				onChange={(e) => sliderReducerHandler(e)}
			/>
		</div>
	);
};

export { Slider };
