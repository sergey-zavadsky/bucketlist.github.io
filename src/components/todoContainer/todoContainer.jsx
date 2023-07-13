import { getTodos } from '../../api/getTodos';
import { useEffect } from 'react';
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

	const deleteHandler = (param) => {
		const array = Object.values(isList).filter((ele) => ele._id !== param._id);
		let newObject = Object.fromEntries(
			array.map((item, index) => [index.toString(), item]),
		);

		const objectLength = (obj) => Object.entries(obj).length;
		setCount(objectLength(isList) - 1);

		setisList(newObject);
	};
	const editItemHandler = () => {
		console.log('editMode');
	};

	return (
		<div className="todo-container">
			<ul className="todo-list">
				{Object.entries(isList).map(([key, value]) => {
					return (
						<div className="todo" key={value._id}>
							<textarea
								className="todo-title"
								onClick={() => editItemHandler()}
								// onChange={(e) => setText(e.target.value)}
								defaultValue={value.text}
							></textarea>
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
