import { RouterProvider } from 'react-router-dom';
import { router } from './config/routes.config';
import { UserContextProvider } from './context/UserContext/UserContext';

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
