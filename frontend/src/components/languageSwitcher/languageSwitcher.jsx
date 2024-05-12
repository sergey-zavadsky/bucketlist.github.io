import { useDispatch } from 'react-redux';
import { switchLanguage } from '../reducers/languageSwitcher/languageSwitcherReducer';
import { tr as intl } from '../local/index';
import { useSelector } from 'react-redux';
import styles from './languageSwitcher.module.scss';
import ornament from './ornament.svg';
import { useState } from 'react';

const LanguageSwitcher = () => {
	const dispatch = useDispatch();

	const [isBel, setIsBel] = useState(true);

	const handleLanguageChange = (newLanguageCode) => {
		dispatch(switchLanguage(!isBel ? 'BY' : 'RU'));
		setIsBel(!isBel);
	};

	const isLanguage = useSelector((state) => {
		return state.switchLanguage.currentLanguage;
	});

	return (
		<div className={styles['language-switcher']}>
			{intl(isLanguage).changeLanguage}
			<button onClick={() => handleLanguageChange()}>
				{isBel ? (
					<>
						<img src={ornament} alt="БЕЛ" /> БЕЛ
					</>
				) : (
					'РУС'
				)}
			</button>
		</div>
	);
};

export default LanguageSwitcher;
