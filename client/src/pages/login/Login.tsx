// Library
import React from 'react';

// Context
import UserContext from 'context/UserContext';

// Components
import { Input } from 'modules/input';

// Styles
import styles from './Login.module.scss';

// Hooks
import { useHistory } from 'react-router';

// Helpers
import { login } from './loginHelper';

export default function Login() {

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | undefined>();
  const history = useHistory();
  const { setUser } = React.useContext(UserContext);

  const onLogin = React.useCallback(() => {
    login(username, password, history, setUser, setError);
  }, [username, password, history, setUser, setError]);

  return (
    <>
      <h1 className={styles.heading}>Quiz App</h1>
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
        <div className={styles.buttonGroup}>
          <button onClick={onLogin}>
            Login
          </button>
          <button onClick={React.useCallback(() => void history.push('/register'), [history])}>
            Register
          </button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </>
  );
}