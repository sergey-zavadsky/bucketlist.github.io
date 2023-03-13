import './App.css';
import { InputForm } from './components/inputForm/inputForm';
import { TodoContainer } from './components/todoContainer/todoContainer';

function App() {
	return (
		<div>
			<div className="main">
				<InputForm />
				<TodoContainer />
			</div>
		</div>
	);
}

export default App;
