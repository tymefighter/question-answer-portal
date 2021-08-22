// Library
import React from 'react';

// Context
import UserContext from 'context/UserContext';

// Helpers
import { SERVER_URL } from '../constants';
import encode from '../encode';

// Types
import { Question } from 'types';
import { useEffect } from 'react';

export default function useQuestions() {
  const { user } = React.useContext(UserContext);
  const [questions, setQuestions] = React.useState<Question[] | undefined>();
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();

  useEffect(() => {
    if(user) {
      const encodedUsernameAndPassword = encode(user.username, user.password);

      fetch(SERVER_URL + `/questions`, {
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
        setQuestions(body as Question[]);
      })
      .catch((error: Error) => {
        setErrorMessage(error.message);
      })
      
    }
    else
      setErrorMessage('You are not logged in');
  }, [user]);

  return { questions, errorMessage };
}