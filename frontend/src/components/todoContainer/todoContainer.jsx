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
import { auth } from '../../../src/utils/auth/firebase';
import { useNavigate } from 'react-router-dom';

const TodoContainer = () => {
	const [isList, setIsList] = useRecoilState(isListState);
	const [isFocusedButton, setIsFocusedButton] = useState([]);
	const [isDone, setIsDone] = useState([]);
	const [values, setValues] = useState([]);
	const [isUser, setIsUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const isLanguage = useSelector((state) => {
		return state.switchLanguage.currentLanguage;
	});

	const fetchData = async () => {
		try {
			const res = await getTodos();
			if (Array.isArray(res)) {
				setIsList(res);
			} else {
				setIsList([]);
				console.error('API response is not an array:', res);
			}
		} catch (error) {
			console.log(error);
			setIsList([]);
		}
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setIsUser(user);
			if (!user) {
				navigate('/login');
				setIsList([]);
			}
		});
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		setIsLoading(true);
		if (isUser) {
			auth.currentUser.getIdToken(true).then(function (idToken) {
				localStorage.setItem('token', idToken);
				fetchData().then(() => {
					setIsLoading(false);
				});
			});
		}
	}, [isUser]);

	useEffect(() => {
		if (Array.isArray(isList) && isList.length > 0) {
			setValues(isList.map((item) => item));
			setIsDone(isList.map((item) => item.isDone));
		} else {
			setValues([]);
			setIsDone([]);
		}
	}, [isList]);

	const deleteHandler = (e, param) => {
		handleSubmit(e);
		deleteTodo(param._id);
		setIsList((prevList) => prevList.filter((ele) => ele._id !== param._id));
	};

	const updateItemHandler = (inputedValue, id, isDone) => {
		if (!isFocusedButton[id]) {
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
		} else {
			updateTodo(inputedValue, id, !isDone);
		}
	};

	const handleTextChange = (index, event) => {
		const newValues = [...values];
		newValues[index] = { ...newValues[index], text: event.target.value };
		setValues(newValues);
		handleSubmit(event);
	};

	const handleFocus = (id) => {
		if (isFocusedButton) {
			setIsFocusedButton(() => ({ [id]: true }));
		}
	};

	const handleBlur = (id) => {
		if (isFocusedButton) {
			setIsFocusedButton(() => ({ [id]: false }));
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	const handleKeyPressAdd = (e) => {
		if (e.key === 'Enter') {
			e.currentTarget.blur();
		}
	};

	const buttonIconSubmit = '✓';

	return (
		<ul className={styles['todo-list']}>
			<Reorder.Group
				axis="y"
				onReorder={(newOrder) => {
					setValues(newOrder);
				}}
				values={values}
			>
				{isLoading ? (
					<>{intl(isLanguage).loading}</>
				) : Array.isArray(isList) && isList.length === 0 && !isLoading ? (
					<>
						<h2>{intl(isLanguage).noItems}</h2>
						<p>{intl(isLanguage).noItemsDescription}</p>
					</>
				) : Array.isArray(values) && values.length > 0 ? (
					values.map((value, i) => {
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
											isDone && isFocusedButton !== value._id
												? updateItemHandler(
														value.text,
														value._id,
														!value.isDone,
												  )
												: updateItemHandler(value.text, value._id, value.isDone)
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
					})
				) : (
					<div>{intl(isLanguage).error || 'Error loading data'}</div>
				)}
			</Reorder.Group>
		</ul>
	);
};

export { TodoContainer };
