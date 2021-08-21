import Role, { isRole } from './Role';

interface User {
  username: string;
  password: string;
  role: Role
};

export const isUser = (user: any): user is User => {
  return (
    typeof user === 'object'
    && typeof user.username === 'string'
    && isRole(user.role)
  );
}

export default User;