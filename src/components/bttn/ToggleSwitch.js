import React, { useContext } from 'react';
import './ToggleSwitch.css';
import ThemeContext from '../../provider/themeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

function ToggleSwitch() {
	const { theme, toggleTheme } = useContext(ThemeContext);

	const handleClick = () => {
		toggleTheme();
	};

	const moon = <FontAwesomeIcon icon={faMoon} />;
	const sun = <FontAwesomeIcon icon={faSun} />;

	return (
		<>
			<label className={`switch ${theme}`}>
				<input type="checkbox" />
				<span className="slider round" onClick={handleClick}>
					<span className="thumb">{theme === 'dark' ? moon : sun}</span>
				</span>
			</label>
		</>
	);
}

export default ToggleSwitch;
