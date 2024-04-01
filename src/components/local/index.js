const tr = (key) => {
	switch (key) {
		case 'RU':
			return {
				placeholder: 'Добавить в список',
				bucketList: 'Список желаний',
				emptyError: 'Заполните поле',
				changeLanguage: 'Язык',
				deleteItem: 'Удалить',
			};
		case 'BY':
			return {
				placeholder: 'Дадаць у спіс',
				bucketList: 'Спіс жаданняў',
				emptyError: 'Запоўніце поле',
				changeLanguage: 'Мова',
				deleteItem: 'Выдаліць',
			};
		default:
			break;
	}
};

export { tr };
