import * as mongodb from 'mongodb';

import { Student, Answer } from '../types';

export default function getStudents(
  db: mongodb.Db
): Promise<Student[]> {
  const students = db.collection('students');
  return students
    .find()
    .toArray() 
    .then(documents => 
      documents.map(document => ({ 
        username: document.username as string,
        attempted: document.attempted as boolean,
        ans: document.ans as Answer[],
        evaluated: document.evaluated as boolean,
        marks: document.marks as number
      }))
    );
};