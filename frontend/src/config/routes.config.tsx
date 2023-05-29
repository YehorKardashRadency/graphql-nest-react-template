import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Layout } from '../pages/Layout';
import Posts from '../pages/Posts';
import { Settings } from '../pages/Settings';
import Onboarding from '../pages/Onboarding';
import { AuthGuard } from '../components/AuthGuard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'settings',
        element: <Settings />
      },
      {
        path: 'posts',
        element: <Posts />
      }
    ]
  },
  {
    path: '/onboarding',
    element: <Onboarding />
  }
]);
