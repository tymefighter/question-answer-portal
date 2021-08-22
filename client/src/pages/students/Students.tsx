// Components
import Loading from 'modules/loading';

// Hooks
import useStudents from 'modules/request/hooks/useStudents';
import { useHistory } from 'react-router';

// Styles
import styles from './Students.module.scss';

export default function Students() {

  const { students, errorMessage } = useStudents();
  const history = useHistory();

  if(errorMessage)
    throw new Error(errorMessage);

  if(students === undefined)
    return <Loading />;

  return (
    <table className={styles.students}>
      <caption>Students</caption>
      <thead>
        <tr>
          <td>Username</td>
          <td>Status</td>
          <td>Marks</td>
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <tr key={student.username} 
            onClick={() => void history.push(`/${student.username}`)}>
            <td>{student.username}</td>
            <td>{student.status}</td>
            <td>{student.status === 'EVALUATED' ? student.marks : 'NA'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}