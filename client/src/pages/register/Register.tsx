// Library
import React from 'react';

// Context
import UserContext from 'context/UserContext';

// Components
import { Input, Selector } from 'modules/input';
import Navbar from 'modules/navbar';

// Styles
import styles from './Register.module.scss';

// Hooks
import { useHistory } from 'react-router';

// Types
import { Role } from 'types';

// Helpers
import { register } from './registerHelper';

export default function Register() {

  const roles: Role[] = React.useMemo(() => [
    'STUDENT', 'SETTER', 'EVALUATOR'
  ], []);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState<Role>('STUDENT');
  const [error, setError] = React.useState<string | undefined>();
  const history = useHistory();
  const { setUser } = React.useContext(UserContext);

  if(error) 
    throw new Error(error);

  const onRegister = React.useCallback(() => {
    register(username, password, role, history, setUser, setError);
  }, [username, password, role, history, setUser, setError]);

  return (
    <>
      <Navbar
        rightLinks={[{
          label: 'Logout',
          link: '/logout'
        }]}
      />
      <h1 className={styles.heading}>Register</h1>
      <div className={styles.inputContainer}>
        <Input  
          inputId="USERNAME"
          type="text"
          label="Username:"
          value={username}
          setValue={setUsername}
        />
        <Input  
          inputId="PASSWORD"
          type="password"
          label="Password:"
          value={password}
          setValue={setPassword}
        />
        <Selector
          className={styles.selector}
          choices={roles}
          value={role}
          setValue={setRole as (role: string) => void}
        />
        <div className={styles.buttonGroup}>
          <button onClick={onRegister}>
            Register
          </button>
          <button onClick={React.useCallback(() => history.push('/'), [history])}>
            Back
          </button>
        </div>
      </div>
    </>
  );
}