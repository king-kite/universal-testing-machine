import { createBrowserRouter, ScrollRestoration } from 'react-router-dom';

import pageRoutes from './config/routes';

// Error Page
import Error from './pages/error';
import NotFound from './pages/not-found';

// Layout
import DashboardLayout from './layout/dashboard';

// Auth
import Home from './pages/home';
import Test from './pages/test';

const routes = [
	{
		path: pageRoutes.HOME_PAGE,
		element: (
			<>
				<DashboardLayout />
				<ScrollRestoration />
			</>
		),
		children: [
			{
				index: true,
				path: '',
				element: <Home />,
			},
			{
				path: pageRoutes.TEST_PAGE,
				element: <Test />,
			},
		],
		errorElement: <Error />,
	},

	{
		path: '*',
		element: <NotFound />,
	},
];

const router = createBrowserRouter(routes);

export default router;
