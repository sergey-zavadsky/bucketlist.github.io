import './slider.css';
import { useSelector, useDispatch } from 'react-redux';
import { completeToGoAction } from '../reducers/completeToGo/completeToGoReducer';
import { tr as intl } from '../local';

const Slider = () => {
	const isLanguage = useSelector((state) => {
		return state.switchLanguage.currentLanguage;
	});
	const isMax = useSelector((state) => {
		return state.completeToGoState?.isMaxValue;
	});
	const dispatch = useDispatch();

	const sliderHandler = (sliderValue) => {
		dispatch(completeToGoAction(sliderValue.target?.value));
	};

	return (
		<div className="slidecontainer">
			<p>{intl(isLanguage).customRangeSlider}</p>
			<input
				type="range"
				min="1"
				max={200}
				value={isMax}
				step={1}
				className=""
				id="myRange"
				onChange={(e) => sliderHandler(e)}
			/>
		</div>
	);
};

export { Slider };
