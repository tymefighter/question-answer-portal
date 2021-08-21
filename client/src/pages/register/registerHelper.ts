// Constants
import { SERVER_URL } from "modules/request/constants";

// Types
import { Role, User } from "types";
import { History } from "history";

export function register(
  username: string, 
  password: string,
  role: Role,
  history: History<unknown>,
  setUser: (user: User) => void,
  setError: (error: string) => void
) {
  fetch(SERVER_URL + '/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password, role })
  })
  .then(async (response) => {
    if(!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `Error: ${response.status} - ${errorMessage}`
      );
    }

    setUser({ username, password, role });
    history.push('/');
  })
  .catch(error => setError(error.message));
}