// Library
import React from 'react';
import * as ReactRouter from 'react-router';

// Context
import UserContext from 'context/UserContext';

export default function Logout() {

  const { removeUser } = React.useContext(UserContext);
  const history = ReactRouter.useHistory();

  React.useEffect(() => {
    removeUser();
    history.push('/');
  });

  return <></>;
}