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
				customRangeSlider: 'Слайдер',
			};
		case 'BY':
			return {
				placeholder: 'Дадаць у спіс',
				bucketList: 'Спіс жаданняў',
				emptyError: 'Запоўніце поле',
				changeLanguage: 'Змяніть мову',
				firstCompleteToGo: 'жадання дадазена, дадай яшчэ ',
				secondCompleteToGo: 'жадання дадана! Віншую!',
				thirdCompleteToGo: 'жадання дадана.',
				customRangeSlider: 'Слайдэр',
			};
		default:
			break;
	}
};

export { tr };
