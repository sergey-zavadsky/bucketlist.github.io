import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { tr as intl } from '../local';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnRight } from '@fortawesome/free-solid-svg-icons';
import { addTodo } from '../../api/addTodo';
import { isUploadedState, isListState, isCountState } from '../../app/stores';
import { useRecoilState } from 'recoil';

const InputForm = () => {
	const [isList, setisList] = useRecoilState(isListState);
	const [isCount, setCount] = useRecoilState(isCountState);
	const [inputedValue, setInputedValue] = useState('');
	const [isShown, setIsShown] = useState('hidden');
	const plane = <FontAwesomeIcon icon={faArrowTurnRight} />;

	const [isUploaded, setisUploaded] = useRecoilState(isUploadedState);

	const isLanguage = useSelector((state) => {
		return state.switchLanguage.currentLanguage;
	});

	useEffect(() => {
		setTimeout(() => {
			setIsShown('hidden');
		}, 5000);
	}, [isShown]);

	const isListHandler = (responseObj) => {
		const objectLength = (obj) => Object.entries(obj).length;
		setCount(objectLength(isList) + 1);
		setisList((oldList) => ({
			...oldList,
			[Object.keys(oldList).length]: responseObj?.newTodo,
		}));
	};

	const inputHandler = async () => {
		addTodo(inputedValue);
		setInputedValue('');
		setisUploaded(!isUploaded);
		isListHandler();
	};

	const handleKeyPressAdd = (e) => {
		if (e.key === 'Enter') {
			addTodo(inputedValue).then((res) => {
				isListHandler(res);
			});
			setInputedValue('');
			setisUploaded(!isUploaded);
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
