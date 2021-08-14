import mongodb from 'mongodb';

import { Question } from 'database/types';

export default function addQuestion(db: mongodb.Db, question: Question) {
  const questions = db.collection('questions');
  return questions.insertOne(question).then(() => {});
}