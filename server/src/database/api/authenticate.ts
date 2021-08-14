import mongodb from 'mongodb';

import { User } from 'database/types';

export default function authenticate(
  db: mongodb.Db, username: string, password: string
): Promise<boolean> {
  const students = db.collection('students');
  return students
    .findOne({ username, password })
    .then(document => {
      return document !== undefined;
    });
};