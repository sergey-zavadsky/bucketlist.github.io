import { useSelector } from 'react-redux';
import { addTitle } from './../reducers/input';
import { deleteTitle } from '../reducers/input';
import { useDispatch } from 'react-redux';
import { getTodos } from '../../api/getTodos';
import { useEffect, useRef, useState } from 'react';

const TodoContainer = () => {
	const [todos, setTodos] = useState([]);
	const data = useSelector((state) => state.inputState.value);

	const dispatch = useDispatch();

	const response = async () => {
		const res = await getTodos();
		return res;
	};
	const apiCallCheck = useRef(false);

	useEffect(() => {
		if (apiCallCheck.current === false) {
			const fetchData = async () => {
				try {
					const res = await response();
					setTodos(res);

					console.log(res);
				} catch (error) {
					console.log(error);
				}
			};
			fetchData();
			return () => {
				apiCallCheck.current = true;
			};
		}
	}, [todos]);

	return (
		<div className="todo-container">
			<ul className="todo-list">
				{Object.entries(todos).map(([key, value]) => {
					return (
						<div className="todo" key={value._id}>
							<div className="todo-title">{value.text}</div>
							<button
								className="marked"
								onClick={() => dispatch(deleteTitle(value._id))}
							>
								-
							</button>
							<button
								className="todo-button-list"
								onClick={() => dispatch(deleteTitle(value._id))}
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
