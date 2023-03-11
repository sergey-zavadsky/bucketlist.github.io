import './App.css';
import { InputForm } from './components/inputForm/inputForm';
import { TodoContainer } from './components/todoContainer/todoContainer';

function App() {
	return (
		<div>
			<h1>Bucket List</h1>
			<InputForm />
			<TodoContainer />
		</div>
	);
}

export default App;
