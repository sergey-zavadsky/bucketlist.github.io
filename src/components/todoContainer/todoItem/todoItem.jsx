import { useRef, useState } from 'react';

export const TodoItem = ({
	value,
	deleteHandler,
	isUploaded,
	setisUploaded,
	editItemHandler,
	deleteTodo,
}) => {
	const [isFocusedButton, setIsFocusedButton] = useState(false);
	const [isTextAreaValue, setTextArea] = useState(value?.text);
	const ref = useRef(null);
	const buttonIconSubmit = '✓';
	const buttonIconPencil = '✏️';

	return (
		<div className="todo" key={value._id}>
			<textarea
				className="todo-title"
				defaultValue={value?.text}
				onChange={(e) => setTextArea(e.target.value)}
				ref={ref}
				onBlur={() => setIsFocusedButton(true)}
				onFocus={() => setIsFocusedButton(false)}
			></textarea>
			<button
				className="todo-button-list"
				onClick={() => {
					deleteTodo(value._id);
					setisUploaded(!isUploaded);
					deleteHandler(value);
				}}
			>
				-
			</button>
			<button
				className="todo-button-list"
				onClick={() => editItemHandler(isTextAreaValue, value._id)}
			>
				{ref.current && isFocusedButton ? buttonIconPencil : buttonIconSubmit}
			</button>
		</div>
	);
};
