const tr = (key) => {
	switch (key) {
		case 'RU':
			return {
				placeholder: 'Добавить в список',
				bucketList: 'Список желаний',
				emptyError: 'Заполните поле',
			};
		case 'BY':
			return {
				placeholder: 'Дадаць у спіс',
				bucketList: 'Спіс жаданняў',
				emptyError: 'Запоўніце поле',
			};
		default:
			break;
	}
};

export { tr };
