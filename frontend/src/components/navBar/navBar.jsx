import { useSelector } from 'react-redux';
import { tr as intl } from '../local';
import LanguageSwitcher from '../languageSwitcher/languageSwitcher';
import styles from './navBar.module.scss';
import { logout } from '../../utils/auth/firebase';
import { Button } from '../bttn/Button';

const NavBar = () => {
	const isLanguage = useSelector((state) => {
		return state.switchLanguage.currentLanguage;
	});
	return (
		<nav className={styles.nav}>
			<h1>{intl(isLanguage).bucketList}</h1>

			<div className={styles['']}>
				<LanguageSwitcher />
				<Button
					borderRadius={0}
					className={styles['todo-button']}
					text={intl(isLanguage).logout}
					onClick={logout}
				/>
			</div>
		</nav>
	);
};

export { NavBar };
