import { Navigate, createBrowserRouter } from 'react-router-dom';
import MainPage from '../mainPage';
import OnBoarding from '../onboarding';
import TradeBots from '../mainPage/pages/TradeBots';
import Dashboard from '../mainPage/pages/Dashboard';
import CosmosApp from '../wallet/components/CosmosApp';

const router = createBrowserRouter([
  {
    path: '/onboarding',
    element: <OnBoarding />,
  },
  {
    path: '/cosmos',
    element: <CosmosApp />,
  },
  {
    path: '/',
    element: <Navigate to='/onboarding' replace />,
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
    ],
  },
]);

export default router;
