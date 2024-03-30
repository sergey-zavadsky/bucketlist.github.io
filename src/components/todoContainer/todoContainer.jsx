import { getTodos } from '../../api/getTodos';
import { useEffect, useRef, useState } from 'react';
import { deleteTodo } from '../../api/deleteTodo';
import { isUploadedState, isListState } from '../../app/stores';
import { useRecoilState } from 'recoil';
import { updateTodo } from '../../api/updateTodo';

const TodoContainer = () => {
	const [isList, setisList] = useRecoilState(isListState);
	const [isUploaded, setisUploaded] = useRecoilState(isUploadedState);
	const [isTextAreaValue, setTextArea] = useState('');
	const [isFocusedButton, setIsFocusedButton] = useState(false);

	const ref = useRef(null);

	const fetchData = async () => {
		try {
			const res = await getTodos();
			setisList(res);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const deleteHandler = (param) => {
		const array = Object.values(isList).filter((ele) => ele._id !== param._id);
		let newObject = Object.fromEntries(
			array.map((item, index) => [index.toString(), item]),
		);
		setisList(newObject);
	};

	const isListHandlerUpdate = (responseObj) => {
		setisList((oldList) => ({
			...oldList,
		}));
	};

	const editItemHandler = async (inputedValue, id, fvalue) => {
		updateTodo(inputedValue, id).then((res) => {
			isListHandlerUpdate(res);
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
