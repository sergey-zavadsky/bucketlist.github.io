import { useSelector } from 'react-redux';
import { tr as intl } from '../local';
import LanguageSwitcher from '../languageSwitcher/languageSwitcher';
import styles from './navBar.module.scss';
import { logout } from '../../utils/auth/firebase';

const NavBar = () => {
	const isLanguage = useSelector((state) => {
		return state.switchLanguage.currentLanguage;
	});
	return (
		<nav className={styles.nav}>
			<h1>{intl(isLanguage).bucketList}</h1>
			<LanguageSwitcher />
			<button onClick={logout}>{intl(isLanguage).logout}</button>
		</nav>
	);
};

export { NavBar };
