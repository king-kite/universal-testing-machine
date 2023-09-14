import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import ErrorBoundary from './components/error-boundary';
import router from './routes';
import store from './store';

function App() {
	return (
		<Provider store={store}>
			<ErrorBoundary>
				<ConfigProvider
					theme={{
						token: {
							colorPrimary: '#1DA1F2',
						},
					}}
				>
					<RouterProvider router={router} />
				</ConfigProvider>
			</ErrorBoundary>
		</Provider>
	);
}

export default App;
