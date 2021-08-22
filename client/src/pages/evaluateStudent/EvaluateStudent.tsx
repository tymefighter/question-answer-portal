// Library
import React from 'react';

// Components
import Loading from 'modules/loading';
import Question from 'modules/question';
import { FilledAnswer } from 'modules/answer';
import MarksForm from './components/MarksForm';

// Hooks
import useStudent from 'modules/request/hooks/useStudent';
import useQuestions from 'modules/request/hooks/useQuestions';
import { useParams } from 'react-router-dom';

// Styles
import styles from './EvaluateStudent.module.scss';

export default function EvaluateStudent() {
  const { username } = useParams<{ username: string }>();
  const { student, errorMessage: studentErrorMessage } = useStudent(username);
  const { questions, errorMessage: questionsErrorMessage } = useQuestions();

  if(studentErrorMessage)
    throw new Error(studentErrorMessage);

  if(questionsErrorMessage)
    throw new Error(questionsErrorMessage);

  if(student == undefined || questions === undefined)
    return <Loading />;

  return (
    <div className={styles.container}>
      <h1>Student: {student.username}</h1>
      {student.status === 'EVALUATED' && (
        <p className={styles.marks}> Marks: {student.marks} </p>
      )}
      {questions.map(question => (
        <div className={styles.questionContainer} key={'QUES_' + question.id}>
          <Question question={question.question} />
          <FilledAnswer 
            answer={
              student.ans
                .find(answer => answer.questionId === question.id)
                ?.answer ?? ''
            } 
          />
        </div>
      ))}
      {student.status === 'ATTEMPTED' && <MarksForm studentUsername={username} />}
    </div>
  )
}