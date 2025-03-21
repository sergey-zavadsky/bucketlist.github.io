import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import ThemeProvider from './provider/themeProvider';
import { RecoilRoot } from 'recoil';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<RecoilRoot>
			<Provider store={store}>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</Provider>
		</RecoilRoot>
	</React.StrictMode>,
);
