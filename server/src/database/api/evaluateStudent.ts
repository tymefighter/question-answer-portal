import * as mongodb from 'mongodb';

import { Status } from '../types';

export default function evaluateStudent(
  db: mongodb.Db, username: string, marks: number
) {
  const students = db.collection('students');
  const status: Status = 'EVALUATED';
  return students
    .updateOne({ username }, { $set: { status, marks } })
    .then(() => {});
}