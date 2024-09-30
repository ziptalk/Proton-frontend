import { Navigate, createBrowserRouter } from 'react-router-dom';
import MainPage from '../mainPage';
import OnBoarding from '../onboarding';
import TradeBots from '../mainPage/pages/TradeBots';
import Dashboard from '../mainPage/pages/Dashboard';
import ErrorNotFound from './pages/ErrorNotFound';
import ErrorServer from './pages/ErrorServer';
import Swap from '../mainPage/pages/Swap';

const router = createBrowserRouter([
  {
    path: '/onboarding',
    element: <OnBoarding />,
  },
  {
    path: '/',
    element: <Navigate to='/onboarding' replace />,
    errorElement: <ErrorNotFound />,
  },
  {
    path: '/',
    element: <MainPage />,
    children: [
      {
        path: 'tradeBots',
        element: <TradeBots />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'swap',
        element: <Swap />,
      },
    ],
  },
  {
    path: '/notFound',
    element: <ErrorNotFound />,
  },
  {
    path: '/error',
    element: <ErrorServer />,
  },
]);

export default router;
