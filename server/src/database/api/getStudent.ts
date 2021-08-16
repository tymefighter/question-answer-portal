import * as mongodb from 'mongodb';

import { Student, Answer } from '../types';

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
        attempted: document.attempted as boolean,
        ans: document.ans as Answer[],
        evaluated: document.evaluated as boolean,
        marks: document.marks as number
      };
    });
};