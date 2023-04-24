import { React, useState, useEffect } from 'react';
import { addTitle } from './../reducers/input';
import { switchLanguage } from '../reducers/languageSwitcher/languageSwitcherReducer';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { tr as intl } from '../local';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnRight } from '@fortawesome/free-solid-svg-icons';
import { getTodos } from '../../api/getTodos';

const InputForm = () => {
	const [inputedValue, setInputedValue] = useState('');
	const [isShown, setIsShown] = useState('hidden');
	const plane = <FontAwesomeIcon icon={faArrowTurnRight} />;

	const dispatch = useDispatch();

	const isLanguage = useSelector((state) => {
		return state.switchLanguage.currentLanguage;
	});

	useEffect(() => {
		setTimeout(() => {
			setIsShown('hidden');
		}, 10000);
	}, [isShown]);

	const inputHandler = async () => {
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
	return (
		<div>
			<div className="App">
				<div className={`success alert ${isShown}`}>
					<p>{intl(isLanguage).emptyError}</p>
					<div onClick={() => setIsShown('hidden')}>X</div>
				</div>
				<div className="absolute-bottom">
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
					{/* <div
							type="button"
							className="todo-button"
							onClick={() => {
								inputedValue
									? inputedValue && inputHandler()
									: setIsShown('show');
							}}
						>
							{plane}
						</div> */}

					<button
						type="button"
						className="todo-button"
						onClick={() => {
							inputedValue
								? inputedValue && inputHandler()
								: setIsShown('show');
						}}
					>
						{plane}
					</button>
				</div>
			</div>
		</div>
	);
};

export { InputForm };
