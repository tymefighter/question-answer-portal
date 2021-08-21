// Constants
import { SERVER_URL } from "modules/request/constants";

// helpers
import encode from "modules/request/encode";

// Types
import { Role, User } from "types";
import { History } from "history";

export function login(
  username: string, 
  password: string,
  history: History<unknown>,
  setUser: (user: User) => void,
  setError: (error: string) => void
) {
  const encodedUsernameAndPassword = encode(username, password);

  fetch(SERVER_URL + '/login', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${encodedUsernameAndPassword}`
    }
  })
  .then(async (response) => {
    if(!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `Error: ${response.status} - ${errorMessage}`
      );
    }

    const body = await response.json();
    const role = body.role as Role;

    setUser({ username, password, role });
    history.push('/');
  })
  .catch(error => setError(error.message));
}