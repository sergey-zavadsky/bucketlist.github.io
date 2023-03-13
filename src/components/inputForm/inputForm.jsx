import { React, useState, useEffect } from 'react';
import { addTitle } from './../reducers/input';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { tr } from '../local';

const InputForm = () => {
	const [inputedValue, setInputedValue] = useState('');
	const [isShown, setIsShown] = useState('hidden');
	const [isLanguage, setIsLanguage] = useState('RU');
	const dispatch = useDispatch();

	useEffect(() => {
		setTimeout(() => {
			setIsShown('hidden');
		}, 10000);
	}, [isShown]);

	const inputHandler = () => {
		dispatch(
			addTitle({
				title: inputedValue,
				id: uuid(),
			}),
		);
		setInputedValue('');
	};

	const handleKeyPressAdd = (e) => {
		if (e.key === 'Enter') {
			inputedValue && inputHandler();
		}
	};

	const switchLanguage = () => {
		if (isLanguage === 'RU') {
			setIsLanguage('BY');
		}
		if (isLanguage === 'BY') {
			setIsLanguage('RU');
		}
	};

	return (
		<div className="App">
			<h1>{tr(isLanguage).bucketList}</h1>

			<button onClick={() => switchLanguage()}>
				{isLanguage === 'RU' ? 'Змяніць мову' : 'Сменить язык'}
			</button>
			<div className={`success alert ${isShown}`}>
				<p>{tr(isLanguage).emptyError}</p>
				<div onClick={() => setIsShown('hidden')}>X</div>
			</div>
			<input
				value={inputedValue}
				placeholder={tr(isLanguage).placeholder}
				type="text"
				onKeyUp={(e) => {
					inputedValue ? handleKeyPressAdd(e) : setIsShown('show');
				}}
				className="todo-input"
				onChange={(e) => setInputedValue(e.target.value)}
			></input>
			<button
				type="button"
				className="todo-button"
				onClick={() => {
					inputedValue ? inputedValue && inputHandler() : setIsShown('show');
				}}
			>
				+
			</button>
		</div>
	);
};

export { InputForm };
