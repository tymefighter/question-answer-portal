import * as mongodb from 'mongodb';

import { Role } from '../types';

export default function authenticate(
  db: mongodb.Db, username: string, password: string
): Promise<Role | undefined> {
  const users = db.collection('users');
  return users
    .findOne({ username, password })
    .then(document => {
      return document === undefined ?
        undefined : document.role as Role;
    });
};