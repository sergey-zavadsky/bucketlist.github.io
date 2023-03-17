import { React, useState, useEffect } from 'react';
import { addTitle } from './../reducers/input';
import { switchLanguage } from '../reducers/languageSwitcher/languageSwitcherReducer';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { tr as intl } from '../local';

const InputForm = () => {
	const [inputedValue, setInputedValue] = useState('');
	const [isShown, setIsShown] = useState('hidden');
	// const [isLanguage, setIsLanguage] = useState('RU');
	const dispatch = useDispatch();

	const isLanguage = useSelector((state) => {
		return state.switchLanguage.currentLanguage;
	});

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

	// const switchLanguage = () => {
	// 	if (isLanguage === 'RU') {
	// 		setIsLanguage('BY');
	// 	}
	// 	if (isLanguage === 'BY') {
	// 		setIsLanguage('RU');
	// 	}
	// };

	return (
		<div>
			<h1>{intl(isLanguage).bucketList}</h1>

			<div className="App">
				<div className={`success alert ${isShown}`}>
					<p>{intl(isLanguage).emptyError}</p>
					<div onClick={() => setIsShown('hidden')}>X</div>
				</div>
				<input
					value={inputedValue}
					placeholder={intl(isLanguage).placeholder}
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
		</div>
	);
};

export { InputForm };