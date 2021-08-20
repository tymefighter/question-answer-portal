import * as mongodb from 'mongodb';

import { Answer, Status } from '../types';

export default function addQuestion(
  db: mongodb.Db, username: string, ans: Answer[]
) {
  const students = db.collection('students');
  const status: Status = 'ATTEMPTED';
  return students
    .updateOne({ username }, { $set: { ans, status } })
    .then(() => {});
}