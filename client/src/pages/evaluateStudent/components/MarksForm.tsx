// Library
import React from 'react';

// Context
import UserContext from 'context/UserContext';

// Helpers
import encode from 'modules/request/encode';

// Types
import { User } from 'types';

// Styles
import styles from './MarksForm.module.scss';

// Constants
import { SERVER_URL } from 'modules/request/constants';

function submitHandler(
  event: React.FormEvent<HTMLFormElement>,
  studentUsername: string,
  marks: number,
  user: User | undefined,
  setErrorMessage: (errorMessage: string) => void
) {
  event.preventDefault();

  if(user === undefined) {
    setErrorMessage('You are not logged in');
    return;
  }

  const encodedUsernameAndPassword = encode(user.username, user.password);

  fetch(SERVER_URL + '/evaluateStudent', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${encodedUsernameAndPassword}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: studentUsername,
      marks: marks
    })
  })
  .then(async response => {
    if(!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    window.location.assign('/');
  })
  .catch((error: Error) => setErrorMessage(error.message));
}

interface MarksFormProps {
  studentUsername: string;
};

export default function MarksForm({ studentUsername }: MarksFormProps) {
  const [marks, setMarks] = React.useState('');
  const [errorString, setErrorString] = React.useState<string | undefined>(undefined);
  const { user } = React.useContext(UserContext);

  const onSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
    submitHandler(
      event, 
      studentUsername, 
      marks === '' ? 0 : parseInt(marks), 
      user, 
      setErrorString
    );
  }, [marks, user, setErrorString])

  if(errorString)
    throw new Error(errorString);

  return (
    <form className={styles.marksForm} onSubmit={onSubmit}>
      <label htmlFor="marks">Marks:</label>
      <input id="marks" type="number" value={marks} 
        onChange={event => setMarks(event.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}