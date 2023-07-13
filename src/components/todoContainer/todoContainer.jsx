import { getTodos } from '../../api/getTodos';
import { useEffect, useState } from 'react';
import { deleteTodo } from '../../api/deleteTodo';
import { isUploadedState, isCountState } from '../../app/stores';
import { useRecoilState } from 'recoil';

const TodoContainer = () => {
	const [todos, setTodos] = useState([]);
	const [isCount, setCount] = useRecoilState(isCountState);
	const [isUploaded, setisUploaded] = useRecoilState(isUploadedState);
	const fetchData = async () => {
		try {
			const res = await getTodos();
			setTodos(res);
			const objectLength = (obj) => Object.entries(obj).length;
			setCount(objectLength(res));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [isUploaded]);

	return (
		<div className="todo-container">
			<ul className="todo-list">
				{Object.entries(todos).map(([key, value]) => {
					return (
						<div className="todo" key={value._id}>
							<div className="todo-title">{value.text}</div>
							<button
								className="marked"
								onClick={() => {
									deleteTodo(value._id);
									setisUploaded(!isUploaded);
								}}
							>
								-
							</button>
							<button
								className="todo-button-list"
								onClick={() => console.log('mark todo')}
							>
								✓
							</button>
						</div>
					);
				})}
			</ul>
		</div>
	);
};

export { TodoContainer };
