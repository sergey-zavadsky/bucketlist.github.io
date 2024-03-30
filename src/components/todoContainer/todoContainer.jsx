import { getTodos } from '../../api/getTodos';
import { useEffect, useRef, useState } from 'react';
import { deleteTodo } from '../../api/deleteTodo';
import { isListState } from '../../app/stores';
import { useRecoilState } from 'recoil';
import { updateTodo } from '../../api/updateTodo';

const TodoContainer = () => {
	const [isList, setIsList] = useRecoilState(isListState);
	const [isTextAreaValue, setTextArea] = useState('');
	const [isFocusedButton, setIsFocusedButton] = useState(false);

	const ref = useRef(null);

	const fetchData = async () => {
		try {
			const res = await getTodos();
			setIsList(res);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	//* Fixed delete for single item
	const deleteHandler = (param) => {
		deleteTodo(param._id);
		setIsList((prevList) => prevList.filter((ele) => ele._id !== param._id));
	};

	//*Fixed update for single item
	const updateItemHandler = (inputedValue, id) => {
		updateTodo(inputedValue, id);
		setIsList((prevList) => {
			return prevList.map((item) => {
				if (item._id === id) {
					return { ...item, text: inputedValue };
				} else {
					return item;
				}
			});
		});
	};

	const buttonIconSubmit = '✓';
	const buttonIconPencil = '✏️';

	return (
		<div className="todo-container">
			<ul className="todo-list">
				{isList.map((value) => {
					return (
						<div className="todo" key={value._id}>
							<textarea
								className="todo-title"
								defaultValue={value?.text}
								onChange={(e) => setTextArea(e.currentTarget.value)}
								ref={ref}
								onBlur={() => setIsFocusedButton(true)}
								onFocus={() => setIsFocusedButton(false)}
							></textarea>
							<button
								className="todo-button-list"
								onClick={() => {
									deleteHandler(value);
								}}
							>
								-
							</button>
							<button
								className="todo-button-list"
								onClick={() => updateItemHandler(isTextAreaValue, value._id)}
							>
								{ref.current && isFocusedButton
									? buttonIconSubmit
									: buttonIconPencil}
							</button>
						</div>
					);
				})}
			</ul>
		</div>
	);
};

export { TodoContainer };
