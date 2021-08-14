import mongodb from 'mongodb';

import { Role } from 'database/types';

export default function authenticate(
  db: mongodb.Db, username: string, password: string
): Promise<Role | undefined> {
  const students = db.collection('students');
  return students
    .findOne({ username, password })
    .then(document => {
      return document === undefined ?
        undefined : document.role as Role;
    });
};