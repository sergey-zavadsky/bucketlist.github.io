import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { tr as intl } from '../local';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnRight } from '@fortawesome/free-solid-svg-icons';
import { addTodo } from '../../api/addTodo';
import { isUploadedState, isListState } from '../../app/stores';
import { useRecoilState } from 'recoil';

const InputForm = () => {
	const [isList, setisList] = useRecoilState(isListState);
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
		}, 10000);
	}, [isShown]);

	const isListHandler = () => {
		setisList((oldList) => ({
			...oldList,
			[Object.keys(oldList).length]: { text: `${inputedValue}` },
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
			addTodo(inputedValue).then((res) => console.log(res));
			setInputedValue('');
			setisUploaded(!isUploaded);
			isListHandler();
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
