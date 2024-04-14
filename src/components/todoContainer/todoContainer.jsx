import { getTodos } from '../../api/getTodos';
import { useEffect, useState } from 'react';
import { deleteTodo } from '../../api/deleteTodo';
import { isListState } from '../../app/stores';
import { useRecoilState } from 'recoil';
import { updateTodo } from '../../api/updateTodo';
import { Input } from '../input/Input';
import { Button } from '../bttn/Button';
import styles from '../inputForm/inputForm.module.scss';
import { useSelector } from 'react-redux';
import { tr as intl } from '../local';
import { Reorder } from 'framer-motion';

const TodoContainer = () => {
	const [isList, setIsList] = useRecoilState(isListState);
	const [isFocusedButton, setIsFocusedButton] = useState([]);
	const [isDone, setIsDone] = useState([]);
	const [values, setValues] = useState([]);
	const isLanguage = useSelector((state) => {
		return state.switchLanguage.currentLanguage;
	});

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

	useEffect(() => {
		setIsFocusedButton(isList.map(() => false));
		setValues(isList.map((item) => item));
		setIsDone(isList.map((item) => item.isDone));
	}, [isList]);

	//* Fixed delete for single item
	const deleteHandler = (e, param) => {
		handleSubmit(e);
		deleteTodo(param._id);
		setIsList((prevList) => prevList.filter((ele) => ele._id !== param._id));
	};

	//*Fixed update for single item
	const updateItemHandler = (inputedValue, id, isDone) => {
		updateTodo(inputedValue, id, isDone);
		setIsList((prevList) => {
			return prevList.map((item) => {
				if (item._id === id) {
					return { ...item, text: inputedValue, isDone: isDone };
				} else {
					return item;
				}
			});
		});
	};

	const handleTextChange = (index, event) => {
		const newValues = [...values];
		newValues[index] = { ...newValues[index], text: event.target.value };
		setValues(newValues);
		handleSubmit(event);
	};

	const handleFocus = (id) => {
		if (isFocusedButton) {
			const newFocus = [...isFocusedButton];
			newFocus[id] = true;
			setIsFocusedButton((prevState) => ({ ...prevState, [id]: newFocus }));
		}
	};

	const handleBlur = (id) => {
		if (isFocusedButton) {
			const newFocus = [...isFocusedButton];
			newFocus[id] = false;
			setIsFocusedButton((prevState) => ({ ...prevState, [id]: newFocus }));
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	const handleKeyPressAdd = (e) => {
		if (e.key === 'Enter') {
			e.currentTarget.blur();
			return setIsFocusedButton(false);
		}
	};

	const buttonIconSubmit = '✓';

	return (
		<ul className={styles['todo-list']}>
			<Reorder.Group axis="y" onReorder={setValues} values={values}>
				{values.map((value, i) => {
					return (
						<Reorder.Item value={value} key={value._id}>
							<form
								onSubmit={handleSubmit}
								className={styles['todo-input-form']}
							>
								<Input
									value={value?.text || ''}
									className={
										value.isDone && !isFocusedButton[i]
											? `${styles['todo-input']} ${styles['todo-input-isDone']}`
											: styles['todo-input']
									}
									onChange={(e) => handleTextChange(i, e)}
									onFocus={() => handleFocus(value._id)}
									onBlur={() => {
										handleBlur(value._id);
									}}
									onKeyUp={(e) => handleKeyPressAdd(e)}
								></Input>
								<Button
									borderRadius={0}
									className={styles['todo-button']}
									onClick={() =>
										isDone && isFocusedButton[i]
											? updateItemHandler(value.text, value._id, value.isDone)
											: updateItemHandler(value.text, value._id, !value.isDone)
									}
									text={buttonIconSubmit}
									minWidth={7.5}
								/>
								<Button
									className={styles['todo-button']}
									onClick={(e) => deleteHandler(e, value)}
									text={intl(isLanguage).deleteItem}
									minWidth={7.5}
								/>
							</form>
						</Reorder.Item>
					);
				})}
			</Reorder.Group>
		</ul>
	);
};

export { TodoContainer };
