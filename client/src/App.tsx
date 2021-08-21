// Components
import { BrowserRouter } from 'react-router-dom';
import UserBasedRoutes from 'modules/userBasedRoutes';
import UserProvider from 'modules/UserProvider';
import ErrorBoundary from 'modules/errorBoundary';

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ErrorBoundary>
          <UserBasedRoutes />
        </ErrorBoundary>
      </UserProvider>
    </BrowserRouter>
  );
}