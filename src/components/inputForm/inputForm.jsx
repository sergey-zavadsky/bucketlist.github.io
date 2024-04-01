import { React, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnRight } from '@fortawesome/free-solid-svg-icons';
import { addTodo } from '../../api/addTodo';
import { useRecoilState } from 'recoil';
import { isListState } from '../../app/stores';
import styles from './inputForm.module.scss';
import { Button } from '../bttn/Button';
import { Input } from '../input/Input';
import { tr as intl } from '../local';
import { useSelector } from 'react-redux';

const InputForm = () => {
	const [isList, setIsList] = useRecoilState(isListState);
	const [inputedValue, setInputedValue] = useState('');
	const plane = <FontAwesomeIcon icon={faArrowTurnRight} />;

	const inputHandler = async () => {
		if (!inputedValue) {
			return;
		}
		addTodo(inputedValue).then((response) => {
			setIsList((prevList) => {
				return [
					...prevList,
					{
						text: inputedValue,
						_id: response._id,
					},
				];
			});
		});

		setInputedValue('');
	};

	const handleKeyPressAdd = (e) => {
		if (e.key === 'Enter') {
			return inputHandler();
		}
	};
	const handleSubmit = (event) => {
		event.preventDefault();
	};

	const isLanguage = useSelector((state) => {
		return state.switchLanguage.currentLanguage;
	});

	return (
		<div className={styles['absolute-bottom']}>
			<form onSubmit={handleSubmit} className={styles['todo-input-form']}>
				<Input
					className={styles['todo-input']}
					placeholder={intl(isLanguage).placeholder}
					onKeyUp={handleKeyPressAdd}
					value={inputedValue}
					onChange={(e) => setInputedValue(e.target.value)}
				/>
				<Button
					className={styles['todo-button']}
					onClick={inputHandler}
					text={plane}
				/>
			</form>
		</div>
	);
};

export { InputForm };
