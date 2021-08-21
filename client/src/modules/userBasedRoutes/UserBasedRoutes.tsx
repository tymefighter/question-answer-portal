// Library
import React from 'react';

// Context
import UserContext from 'context/UserContext';

// Components
import { Switch } from 'react-router-dom';

// Route Factory
import routeFactory from './routeFactory';

export default function UserBasedRoutes() {
  const { user } = React.useContext(UserContext);

  return (
    <Switch>
      { routeFactory(user) }
    </Switch>
  );
}