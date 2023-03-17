import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { tr as intl } from '../local';

const CompleteToGo = () => {
	const [isComplete, setComplete] = useState(0);
	const data = useSelector((state) => state.inputState.value);
	const isMax = useSelector((state) => {
		return state.completeToGoState?.isMaxValue;
	});

	const isLanguage = useSelector((state) => {
		return state.switchLanguage.currentLanguage;
	});

	useEffect(() => {
		setComplete(data?.length || 0);
	}, [data]);

	if (data?.length < isMax) {
		return (
			<div>
				<span>{isComplete}</span> {intl(isLanguage).firstCompleteToGo}{' '}
				{isMax - isComplete}
			</div>
		);
	}
	if (data?.length === isMax) {
		return (
			<div>
				<span>{isComplete}</span> {intl(isLanguage).secondCompleteToGo}
			</div>
		);
	}
	if (data?.length >= isMax) {
		return (
			<div>
				<span>{isComplete}</span> {intl(isLanguage).thirdCompleteToGo}
			</div>
		);
	}
};

export { CompleteToGo };
