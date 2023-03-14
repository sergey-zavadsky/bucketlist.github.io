import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { tr as intl } from '../local';
import { switchLanguage } from '../reducers/languageSwitcher/languageSwitcherReducer';

const CompleteToGo = () => {
	const [isComplete, setComplete] = useState(0);
	const [isMax, setMax] = useState(10);
	const data = useSelector((state) => state.inputState.value);

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
	if (data?.length > isMax) {
		return (
			<div>
				<span>{isComplete}</span> {intl(isLanguage).thirdCompleteToGo}
			</div>
		);
	}
};

export { CompleteToGo };
