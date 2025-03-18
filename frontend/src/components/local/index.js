const tr = (key) => {
	switch (key) {
		case 'RU':
			return {
				placeholder: 'Добавить в список',
				bucketList: 'Список желаний',
				emptyError: 'Заполните поле',
				changeLanguage: 'Язык',
				language: 'РУС',
				deleteItem: 'Удалить',
				logout: 'Выйти',
				noItems: 'Список пуст',
				noItemsDescription: 'добавьте пару',
				loading: 'Загрузка...',
				loginGoogle: 'Войти через Google',
			};
		case 'BY':
			return {
				placeholder: 'Дадаць у спіс',
				bucketList: 'Спіс жаданняў',
				emptyError: 'Запоўніце поле',
				changeLanguage: 'Мова',
				language: 'БЕЛ',
				deleteItem: 'Выдаліць',
				logout: 'Выйсці',
				noItems: 'Спіс пусты',
				noItemsDescription: 'дадайце пару',
				loading: 'Загрузка...',
				loginGoogle: 'Увайсці праз Google',
			};
		default:
			break;
	}
};

export { tr };
