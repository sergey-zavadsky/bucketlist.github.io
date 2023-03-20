import './App.css';
import { CompleteToGo } from './components/completeToGo/completeToGo';
import { InputForm } from './components/inputForm/inputForm';
import LanguageSwitcher from './components/languageSwitcher/languageSwitcher';
import { TodoContainer } from './components/todoContainer/todoContainer';
import ToggleSwitch from './components/bttn/ToggleSwitch';
import ThemeContext from './provider/themeContext';
import { useContext } from 'react';

function App() {
	const { theme } = useContext(ThemeContext);
	return (
		<div className={`app-container ${theme}`}>
			<ToggleSwitch />
			<LanguageSwitcher />
			<CompleteToGo />
			<InputForm />
			<TodoContainer />
		</div>
	);
}

export default App;
