import { useDispatch } from 'react-redux';
import { switchLanguage } from '../reducers/languageSwitcher/languageSwitcherReducer';
import { tr as intl } from '../local/index';
import { useSelector } from 'react-redux';
import styles from './languageSwitcher.module.scss';
import ornament from './ornament.svg';
import { useState } from 'react';
import { Button } from '../bttn/Button';

const LanguageSwitcher = () => {
	const dispatch = useDispatch();

	const [isBel, setIsBel] = useState(true);

	const handleLanguageChange = () => {
		dispatch(switchLanguage(!isBel ? 'BY' : 'RU'));
		setIsBel(!isBel);
	};

	const isLanguage = useSelector((state) => {
		return state.switchLanguage.currentLanguage;
	});

	{
		return isBel ? (
			<>
				{intl(isLanguage).changeLanguage}
				<Button
					onClick={() => handleLanguageChange()}
					className={styles['todo-button']}
					text={intl(isLanguage).language}
					icon={ornament}
				/>
			</>
		) : (
			<>
				{intl(isLanguage).changeLanguage}
				<Button
					onClick={() => handleLanguageChange()}
					className={styles['todo-button']}
					text={intl(isLanguage).language}
				/>
			</>
		);
	}
};

export default LanguageSwitcher;
