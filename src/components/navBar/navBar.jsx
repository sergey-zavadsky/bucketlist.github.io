import { useSelector } from 'react-redux';
import { tr as intl } from '../local';
import ToggleSwitch from '../bttn/ToggleSwitch';
import LanguageSwitcher from '../languageSwitcher/languageSwitcher';

const NavBar = () => {
	const isLanguage = useSelector((state) => {
		return state.switchLanguage.currentLanguage;
	});
	return (
		<nav className="nav-bar">
			<h1>{intl(isLanguage).bucketList}</h1>
			<ToggleSwitch />
			<LanguageSwitcher />
		</nav>
	);
};

export { NavBar };
