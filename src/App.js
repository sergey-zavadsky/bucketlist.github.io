import './App.css';
import { CompleteToGo } from './components/completeToGo/completeToGo';
import { InputForm } from './components/inputForm/inputForm';
import { TodoContainer } from './components/todoContainer/todoContainer';
import ThemeContext from './provider/themeContext';
import { useContext } from 'react';
import { NavBar } from './components/navBar/navBar';
import { Slider } from './components/slider/slider';

function App() {
	const { theme } = useContext(ThemeContext);
	return (
		<div className={`app-container ${theme}`}>
			<NavBar />
			<CompleteToGo />
			<Slider />
			<InputForm />
			<TodoContainer />
		</div>
	);
}

export default App;
