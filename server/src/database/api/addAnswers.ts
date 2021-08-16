import * as mongodb from 'mongodb';

import { Answer } from '../types';

export default function addQuestion(
  db: mongodb.Db, username: string, ans: Answer[]
) {
  const students = db.collection('students');
  return students
    .updateOne({ username }, { $set: { ans, attempted: true } })
    .then(() => {});
}