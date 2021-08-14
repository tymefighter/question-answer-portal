import mongodb from 'mongodb';
import initialize from "./initialize";

import register from './api/register';
import authenticate from './api/authenticate';
import getStudent from './api/getStudent';
import getStudents from './api/getStudents';
import getQuestions from './api/getQuestions';
import addQuestion from './api/addQuestion';
import addAnswers from './api/addAnswers';
import evaluateStudent from './api/evaluateStudent';

import { Answer, Student, Question, User } from './types';

class Database {
  client: mongodb.MongoClient;
  db: mongodb.Db;

  constructor() {
    const { client, db } = initialize();
    this.client = client;
    this.db = db;
  }

  register(user: User): Promise<boolean> {
    return register(this.client, this.db, user);
  }

  authenticate(username: string, password: string): Promise<boolean> {
    return authenticate(this.db, username, password);
  }

  getStudent(username: string): Promise<Student> {
    return getStudent(this.db, username);
  }

  getStudents(): Promise<Student[]> {
    return getStudents(this.db);
  }

  getQuestions(): Promise<Question[]> {
    return getQuestions(this.db);
  }

  addQuestion(question: Question): Promise<void> {
    return addQuestion(this.db, question);
  }

  addAnswers(username: string, ans: Answer[]): Promise<void> {
    return addAnswers(this.db, username, ans);
  }

  evaluateStudent(username: string, marks: number): Promise<void> {
    return evaluateStudent(this.db, username, marks);
  }
}

export default Database;