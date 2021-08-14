import mongodb from 'mongodb';

import { Question } from 'database/types';

export default function getQuestions(
  db: mongodb.Db
): Promise<(Question & {id: string})[]> {
  const questions = db.collection('questions');
  return questions
    .find()
    .toArray() 
    .then(documents => 
      documents.map(document => ({ 
        id: document._id as string, 
        question: document.question as string
      }))
    );
};