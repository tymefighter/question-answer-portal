// Library
import React from 'react';

// Components
import UserContext from 'context/UserContext';

// Types
import { User } from 'types';
import { useEffect } from 'react';

interface UserProviderProps {
  children: React.ReactElement;
};

export default function UserProvider({ children }: UserProviderProps) {

  const [user, setUser] = React.useState<User | undefined>();

  useEffect(() => {
    const userJSON = sessionStorage.getItem('user');

    if(userJSON) setUser(JSON.parse(userJSON) as User);
  }, []);

  const setUserAlongWithSessionStorage = (user : User) => {
    setUser(user);
    sessionStorage.setItem('user', JSON.stringify(user));
  }
  
  const removeUser = () => {
    setUser(undefined);
    sessionStorage.removeItem('user');
    console.log(user, sessionStorage.getItem('user'))
  }

  return (
    <UserContext.Provider value={{ user, setUser: setUserAlongWithSessionStorage, removeUser }}>
      { children }
    </UserContext.Provider>
  );
}