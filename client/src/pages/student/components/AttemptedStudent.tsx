// Library
import React from 'react';

// Components
import Loading from 'modules/loading';
import Question from 'modules/question';
import { FilledAnswer } from 'modules/answer';

// Hooks
import useQuestions from 'modules/request/hooks/useQuestions'

// Styles
import styles from './AttemptedStudent.module.scss';

// Types
import { Answer as AnswerType } from 'types';

interface AttemptedStudentProps {
  ans: AnswerType[];
};

export default function AttemptedStudent({ ans }: AttemptedStudentProps) {

  const { questions, errorMessage } = useQuestions();

  if(errorMessage)
    throw new Error(errorMessage);

  if(questions === undefined)
    return <Loading />;

  return (
    <div className={styles.container}>
      {questions.map(question => (
        <div className={styles.questionContainer} key={'QUES_' + question.id}>
          <Question question={question.question} />
          <FilledAnswer 
            answer={
              ans
                .find(answer =>  answer.questionId === question.id)
                ?.answer ?? ''
            } 
          />
        </div>
      ))}
    </div>
  )
}