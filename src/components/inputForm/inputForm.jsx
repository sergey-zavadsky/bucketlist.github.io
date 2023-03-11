import { React, useState } from 'react';
import { addTitle } from './../reducers/input';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

const InputForm = () => {
	const [inputedValue, setInputedValue] = useState('');
	const dispatch = useDispatch();

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

	return (
		<div className="App">
			<input
				value={inputedValue}
				placeholder="Добавить в список"
				type="text"
				onKeyUp={(e) => handleKeyPressAdd(e)}
				className="todo-input"
				onChange={(e) => setInputedValue(e.target.value)}
			></input>
			<button
				type="button"
				className="todo-button"
				onClick={() => {
					inputedValue && inputHandler();
				}}
			>
				+
			</button>
		</div>
	);
};

export { InputForm };
