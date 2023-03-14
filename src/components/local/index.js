const tr = (key) => {
	switch (key) {
		case 'RU':
			return {
				placeholder: 'Добавить в список',
				bucketList: 'Список желаний',
				emptyError: 'Заполните поле',
				changeLanguage: 'Сменить язык',
				firstCompleteToGo: 'желаний добавлено, добавь еще ',
				secondCompleteToGo: 'желаний добавлено! Поздравляю!',
				thirdCompleteToGo: 'желаний добавлено.',
			};
		case 'BY':
			return {
				placeholder: 'Дадаць у спіс',
				bucketList: 'Спіс жаданняў',
				emptyError: 'Запоўніце поле',
				changeLanguage: 'Змяніть мову',
				firstCompleteToGo: 'жаданняў дадазена, дадай яшчэ ',
				secondCompleteToGo: 'жаданняу дадана! Віншую!',
				thirdCompleteToGo: 'жаданняу дадана.',
			};
		default:
			break;
	}
};

export { tr };
