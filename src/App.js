import './App.css';
import { CompleteToGo } from './components/completeToGo/completeToGo';
import { InputForm } from './components/inputForm/inputForm';
import LanguageSwitcher from './components/languageSwitcher/languageSwitcher';
import { TodoContainer } from './components/todoContainer/todoContainer';
// import ToggleSwitch from './components/bttn/ToggleSwitch';

function App() {
	return (
		<div>
			<div className="main">
				{/* <ToggleSwitch /> */}
				<LanguageSwitcher />
				<CompleteToGo />
				<InputForm />
				<TodoContainer />
			</div>
		</div>
	);
}

export default App;
