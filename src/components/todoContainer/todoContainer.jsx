import { useSelector } from 'react-redux';
import { deleteTitle } from '../reducers/input';
import { useDispatch } from 'react-redux';

const TodoContainer = () => {
	const data = useSelector((state) => state.inputState.value);
	const dispatch = useDispatch();
	return (
		<div className="todo-container">
			<ul className="todo-list">
				{data.map((e, i) => {
					return (
						<div className="todo" key={i}>
							<div>{e.title}</div>
							<button
								className="button"
								onClick={() => dispatch(deleteTitle(e.id))}
							>
								-
							</button>
						</div>
					);
				})}
			</ul>
		</div>
	);
};

export { TodoContainer };
