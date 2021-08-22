// Library
import React from 'react';

// Context
import UserContext from 'context/UserContext';

// Types
import { User } from 'types';

// Styles
import styles from './QuestionForm.module.scss';

// Constants
import { SERVER_URL } from 'modules/request/constants';

// Helpers
import encode from 'modules/request/encode';

function handleSubmit(
  event: React.FormEvent<HTMLFormElement>,
  question: string, 
  user: User | undefined, 
  setErrorMessage: (errorMessage: string) => void
) {
  event.preventDefault();

  if(user === undefined) {
    setErrorMessage('You are not logged in');
    return;
  }

  const encodedUsernameAndPassword = encode(user.username, user.password);

  fetch(SERVER_URL + '/questions', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${encodedUsernameAndPassword}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ question })
  })
  .then(async response => {
    if(!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `Error: ${response.status} - ${errorMessage}`
      );
    }

    window.location.assign('/');
  })
  .catch((error: Error) => setErrorMessage(error.message));
}

export default function QuestionForm() {
  const [question, setQuestion] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();
  const { user } = React.useContext(UserContext);

  const onSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(event, question, user, setErrorMessage);
  }, [question, setErrorMessage]);

  if(errorMessage)
    throw new Error(errorMessage);

  return (
    <form className={styles.questionForm} onSubmit={onSubmit}>
      <textarea rows={6}
        value={question} 
        onChange={event => setQuestion(event.target.value)}>
      </textarea>
      <button type="submit">Add</button>
    </form>
  );
}