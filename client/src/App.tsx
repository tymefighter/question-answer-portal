// Components
import { BrowserRouter } from 'react-router-dom';
import UserBasedRoutes from 'modules/userBasedRoutes';
import UserProvider from 'modules/UserProvider';

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <UserBasedRoutes />
      </UserProvider>
    </BrowserRouter>
  );
}