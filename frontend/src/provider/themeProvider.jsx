import React, { useState, useEffect } from 'react';
import ThemeContext from './themeContext';

const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState('dark');

	useEffect(() => {
		const rootDiv = document.getElementById('root');

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
