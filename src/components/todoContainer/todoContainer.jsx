import { getTodos } from '../../api/getTodos';
import { useEffect, useState } from 'react';
import { deleteTodo } from '../../api/deleteTodo';
import { isUploadedState, isCountState, isListState } from '../../app/stores';
import { useRecoilState } from 'recoil';

const TodoContainer = () => {
	const [isList, setisList] = useRecoilState(isListState);
	const [isCount, setCount] = useRecoilState(isCountState);
	const [isUploaded, setisUploaded] = useRecoilState(isUploadedState);
	const fetchData = async () => {
		try {
			const res = await getTodos();
			setisList(res);
			const objectLength = (obj) => Object.entries(obj).length;
			setCount(objectLength(res));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		console.log(isList);
	}, [isUploaded]);

	const deleteHandler = (param) => {
		const array = Object.values(isList).filter((ele) => ele._id !== param._id);
		let newObject = Object.fromEntries(
			array.map((item, index) => [index.toString(), item]),
		);

		setisList(newObject);
	};

	return (
		<div className="todo-container">
			<ul className="todo-list">
				{Object.entries(isList).map(([key, value]) => {
					return (
						<div className="todo" key={value._id}>
							<div className="todo-title">{value.text}</div>
							<button
								className="marked"
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
