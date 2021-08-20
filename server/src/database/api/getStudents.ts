import * as mongodb from 'mongodb';

import { Student, Answer, Status } from '../types';

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
        ans: document.ans as Answer[],
        status: document.status as Status,
        marks: document.marks as number
      }))
    );
};