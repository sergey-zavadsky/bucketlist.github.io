import { InputForm } from './components/inputForm/inputForm';
import { TodoContainer } from './components/todoContainer/todoContainer';
import ThemeContext from './provider/themeContext';
import { useContext } from 'react';
import { NavBar } from './components/navBar/navBar';
import styles from './App.module.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './utils/auth/Login';
import ErrorPage from './components/errorPage/Error-page';

const router = createBrowserRouter([
	{
		path: '/',
		errorElement: <ErrorPage />,
		element: (
			<>
				<NavBar />
				<TodoContainer />
				<InputForm />
			</>
		),
	},
	{
		path: '/login/',
		errorElement: <ErrorPage />,
		home: true,
		element: (
			<>
				<Login />
			</>
		),
	},
]);

function App() {
	const { theme } = useContext(ThemeContext);

	return (
		<div className={`${styles.block} ${theme}`}>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
