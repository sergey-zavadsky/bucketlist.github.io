import './App.css';
import { InputForm } from './components/inputForm/inputForm';
import { TodoContainer } from './components/todoContainer/todoContainer';
import ThemeContext from './provider/themeContext';
import { useContext } from 'react';
import { NavBar } from './components/navBar/navBar';

function App() {
	const { theme } = useContext(ThemeContext);
	return (
		<div className={`app-container ${theme}`}>
			<NavBar />
			<InputForm />
			<TodoContainer />
		</div>
	);
}

export default App;
