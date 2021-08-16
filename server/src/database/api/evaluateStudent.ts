import * as mongodb from 'mongodb';

export default function evaluateStudent(
  db: mongodb.Db, username: string, marks: number
) {
  const students = db.collection('students');
  return students
    .updateOne({ username }, { evaluated: true, marks })
    .then(() => {});
}