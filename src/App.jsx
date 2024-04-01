import { InputForm } from './components/inputForm/inputForm';
import { TodoContainer } from './components/todoContainer/todoContainer';
import ThemeContext from './provider/themeContext';
import { useContext } from 'react';
import { NavBar } from './components/navBar/navBar';
import styles from './App.module.scss';

function App() {
	const { theme } = useContext(ThemeContext);
	return (
		<div className={`${styles.block} ${theme}`}>
			<NavBar />
			<TodoContainer />
			<InputForm />
		</div>
	);
}

export default App;
