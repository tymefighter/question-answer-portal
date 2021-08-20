import * as mongodb from 'mongodb';

import { Student, Answer, Status } from '../types';

export default function getStudents(
  db: mongodb.Db, username: string
): Promise<Student | undefined> {
  const students = db.collection('students');
  return students
    .findOne({ username })
    .then(document => {
      if(document === undefined) return undefined;

      return { 
        username: document.username as string,
        ans: document.ans as Answer[],
        status: document.status as Status,
        marks: document.marks as number
      };
    });
};