import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { tr as intl } from '../local';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnRight } from '@fortawesome/free-solid-svg-icons';
import { addTodo } from '../../api/addTodo';
import { useRecoilState } from 'recoil';
import { isListState } from '../../app/stores';

const InputForm = () => {
	const [isList, setIsList] = useRecoilState(isListState);
	const [inputedValue, setInputedValue] = useState('');
	const [isShown, setIsShown] = useState('hidden');
	const plane = <FontAwesomeIcon icon={faArrowTurnRight} />;

	const isLanguage = useSelector((state) => {
		return state.switchLanguage.currentLanguage;
	});

	const inputHandler = async () => {
		addTodo(inputedValue).then((response) => {
			setIsList((prevList) => {
				return [
					...prevList,
					{
						text: inputedValue,
						_id: response.newTodo._id,
					},
				];
			});
		});

		setInputedValue('');
	};

	const handleKeyPressAdd = (e) => {
		if (e.key === 'Enter') {
			inputHandler();
		}
	};
	return (
		<div>
			<div className="App">
				<div className={`success alert ${isShown}`}>
					<p>{intl(isLanguage).emptyError}</p>
					<div onClick={() => setIsShown('hidden')} />
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
