// Library
import React from 'react';

// Components
import Loading from 'modules/loading';
import AttemptingStudent from './components/AttemptingStudent';
import AttemptedStudent from './components/AttemptedStudent';
import Navbar from 'modules/navbar';

// Context
import UserContext from 'context/UserContext';

// Hooks
import useStudent from 'modules/request/hooks/useStudent';

// Styles
import styles from './Student.module.scss';

export default function Student() {

  const { user } = React.useContext(UserContext);

  if(user === undefined) 
    throw new Error('You are not logged in');

  const { student, errorMessage } = useStudent(user.username);

  if(errorMessage)
    throw new Error(errorMessage);

  if(student === undefined)
    return <Loading />;

  let heading = '';
  switch(student.status) {
    case 'NOT_ATTEMPTED':
      heading = 'Questions';
      break;

    case 'ATTEMPTED':
      heading = 'Your Answers';
      break;

    case 'EVALUATED':
      heading = 'Results';
      break;
  }

  const marksElement = student.status === 'EVALUATED' ? (
    <p className={styles.marks}> Marks: {student.marks} </p>
  ) : null;

  return (
    <>
      <Navbar
        rightLinks={[{
          label: 'Logout',
          link: '/logout'
        }]}
      />
      <h1 className={styles.heading}>{heading}</h1>
      {marksElement}
      {student.status === 'NOT_ATTEMPTED' ?
        <AttemptingStudent /> : <AttemptedStudent ans={student.ans} />}
    </>
  )
}