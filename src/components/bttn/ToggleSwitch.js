import React, { useState, useContext } from 'react';
import './ToggleSwitch.css';
import ThemeContext from '../../provider/themeContext';

function ToggleSwitch() {
	const { theme, toggleTheme } = useContext(ThemeContext);

	const [isOn, setIsOn] = useState(false);

	const handleClick = () => {
		setIsOn((prevIsOn) => !prevIsOn);
		toggleTheme();
	};

	return (
		<>
			<label class="switch">
				<input type="checkbox" />
				<span class="slider round"></span>
			</label>

			{/* <div className="toggle-switch-container">
				<button
					className={`toggle-switch ${isOn ? theme : theme}`}
					onClick={handleClick}
				>
					<span className="toggle-switch-inner" />
				</button>
				<span className="toggle-switch-label">{isOn ? 'On' : 'Off'}</span>
			</div> */}
		</>
	);
}

export default ToggleSwitch;
