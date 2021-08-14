import Role from './Role';

interface User {
  username: string;
  password: string;
  role: Role
};

export default User;