// Library
import React from 'react';

// Context
import UserContext from 'context/UserContext';

// Helpers
import { SERVER_URL } from '../constants';
import encode from '../encode';

// Types
import { Student } from 'types';
import { useEffect } from 'react';

export default function useStudents() {
  const { user } = React.useContext(UserContext);
  const [students, setStudents] = React.useState<Student[] | undefined>();
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();

  useEffect(() => {
    if(user) {
      const encodedUsernameAndPassword = encode(user.username, user.password);

      fetch(SERVER_URL + `/students`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${encodedUsernameAndPassword}`
        }
      })
      .then(async response => {

        if(!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }

        const body = await response.json();
        setStudents(body as Student[]);
      })
      .catch((error: Error) => {
        setErrorMessage(error.message);
      })
      
    }
    else
      setErrorMessage('You are not logged in');
  }, [user]);

  return { students, errorMessage };
}