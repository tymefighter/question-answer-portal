// Library
import React from 'react';

// Context
import UserContext from 'context/UserContext';

// Helpers
import encode from 'modules/request/encode';

// Components
import Loading from 'modules/loading';
import Question from 'modules/question';
import { Answer } from 'modules/answer';

// Hooks
import useQuestions from 'modules/request/hooks/useQuestions'

// Styles
import styles from './AttemptingStudent.module.scss';

// Types
import { Answer as AnswerType, User } from 'types';

// Constants
import { SERVER_URL } from 'modules/request/constants';

function submitHandler(
  event: React.FormEvent<HTMLFormElement>,
  user: User | undefined,
  setSubmitError: (submitError: string) => void
) {
  event.preventDefault();

  if(user === undefined) {
    setSubmitError('You are not logged in');
    return;
  }

  const form = event.currentTarget;
  const ans: AnswerType[] = [];

  form
    .querySelectorAll('textarea')
    .forEach(textareaElement => {
      ans.push({
        questionId: textareaElement.id,
        answer: textareaElement.value
      });
    });

  const encodedUsernameAndPassword = encode(user.username, user.password);
  
  fetch(SERVER_URL + '/answers', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${encodedUsernameAndPassword}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ans)
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
  .catch((error: Error) => setSubmitError(error.message));
}

export default function AttemptingStudent() {

  const { questions, errorMessage } = useQuestions();
  const [submitError, setSubmitError] = React.useState<string | undefined>();
  const { user } = React.useContext(UserContext);

  const onSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => submitHandler(event, user, setSubmitError), 
    [submitHandler]
  );

  if(errorMessage)
    throw new Error(errorMessage);

  if(questions === undefined)
    return <Loading />;

  if(submitError)
    throw new Error(submitError);

  return (
    <form className={styles.form} 
      onSubmit={onSubmit}>
      {questions.map(question => (
        <div className={styles.questionContainer} key={'QUES_' + question.id}>
          <Question question={question.question} />
          <Answer inputId={question.id} />
        </div>
      ))}
      <button type="submit" className={styles.submitButton}>Submit</button>
    </form>
  )
}