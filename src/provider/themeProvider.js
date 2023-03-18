import React, { useState, useEffect } from 'react';
import ThemeContext from './themeContext';

const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState('light');

	useEffect(() => {
		// Get the root div
		const rootDiv = document.getElementById('root');

		// Update root div class based on the current theme
		if (rootDiv) {
			if (theme === 'light') {
				rootDiv.classList.add('light-theme');
				rootDiv.classList.remove('dark-theme');
			} else {
				rootDiv.classList.add('dark-theme');
				rootDiv.classList.remove('light-theme');
			}
		}
	}, [theme]);

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
