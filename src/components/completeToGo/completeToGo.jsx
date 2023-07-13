import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { tr as intl } from '../local';
import { isCountState } from '../../app/stores';
import { useRecoilState } from 'recoil';

const CompleteToGo = () => {
	const [isCount, setCount] = useRecoilState(isCountState);

	const data = useSelector((state) => state.inputState.value);
	const isMax = useSelector((state) => {
		return state.completeToGoState?.isMaxValue;
	});

	const isLanguage = useSelector((state) => {
		return state.switchLanguage.currentLanguage;
	});

	useEffect(() => {
		// setComplete(data?.length || 0);
		console.log(data);
	}, [data]);

	if (data?.length < isMax) {
		return (
			<div>
				<span>{isCount}</span> {intl(isLanguage).firstCompleteToGo}{' '}
				{isMax - isCount}
			</div>
		);
	}
	if (data?.length === isMax) {
		return (
			<div>
				<span>{isCount}</span> {intl(isLanguage).secondCompleteToGo}
			</div>
		);
	}
	if (data?.length >= isMax) {
		return (
			<div>
				<span>{isCount}</span> {intl(isLanguage).thirdCompleteToGo}
			</div>
		);
	}
};

export { CompleteToGo };
