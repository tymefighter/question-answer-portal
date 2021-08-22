import React from 'react';
import { User } from 'types';

type UserContextType = {
  user: User | undefined;
  setUser: (user: User) => void;
  removeUser: () => void;
};

const UserContext = React.createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
  removeUser: () => {}
});

export default UserContext;