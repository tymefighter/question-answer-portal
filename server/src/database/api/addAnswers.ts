import mongodb from 'mongodb';

import { Answer } from 'database/types';

export default function addQuestion(
  db: mongodb.Db, username: string, ans: Answer[]
) {
  const students = db.collection('students');
  return students
    .updateOne({ username }, { ans })
    .then(() => {});
}