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

const TodoContainer = () => {
	const [isList, setIsList] = useRecoilState(isListState);
	const [isFocusedButton, setIsFocusedButton] = useState([]);
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
		setValues(isList.map((item) => item.text));
	}, [isList]);

	//* Fixed delete for single item
	const deleteHandler = (e, param) => {
		handleSubmit(e);
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

	const handleTextChange = (index, event) => {
		const newValues = [...values];
		newValues[index] = event.target.value;
		setValues(newValues);
		handleSubmit(event);
	};

	const handleFocus = (index) => {
		if (isFocusedButton) {
			const newFocus = [...isFocusedButton];
			newFocus[index] = true;
			setIsFocusedButton(newFocus);
		}
	};

	const handleBlur = (index) => {
		if (isFocusedButton) {
			const newFocus = [...isFocusedButton];
			newFocus[index] = false;
			setIsFocusedButton(newFocus);
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
	const buttonIconPencil = '✏️';

	return (
		<ul className={styles['todo-list']}>
			{isList.map((value, i) => {
				return (
					<form
						onSubmit={handleSubmit}
						key={i}
						className={styles['todo-input-form']}
					>
						<Input
							value={values[i] || ''}
							className={styles['todo-input']}
							onChange={(e) => handleTextChange(i, e)}
							onFocus={() => handleFocus(i)}
							onBlur={() => {
								handleBlur(i);
							}}
							onKeyUp={(e) => handleKeyPressAdd(e)}
						></Input>

						<Button
							borderRadius={0}
							className={styles['todo-button']}
							onClick={() => updateItemHandler(values[i], value._id)}
							text={isFocusedButton[i] ? buttonIconPencil : buttonIconSubmit}
						/>

						<Button
							className={styles['todo-button']}
							onClick={(e) => deleteHandler(e, value)}
							text={intl(isLanguage).deleteItem}
						/>
					</form>
				);
			})}
		</ul>
	);
};

export { TodoContainer };
