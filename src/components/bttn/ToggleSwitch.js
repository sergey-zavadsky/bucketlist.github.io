import React, { useState } from 'react';
import './ToggleSwitch.css';

function ToggleSwitch() {
	const [isOn, setIsOn] = useState(false);

	const handleClick = () => {
		setIsOn((prevIsOn) => !prevIsOn);
	};

	return (
		<div className="toggle-switch-container">
			<button
				className={`toggle-switch ${isOn ? 'on' : ''}`}
				onClick={handleClick}
			>
				<span className="toggle-switch-inner" />
			</button>
			<span className="toggle-switch-label">{isOn ? 'On' : 'Off'}</span>
		</div>
	);
}

export default ToggleSwitch;
