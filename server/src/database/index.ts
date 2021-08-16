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

import { Answer, Student, Question, User, Role } from './types';

class Database {
  clientDbPromise: Promise<{client: mongodb.MongoClient, db: mongodb.Db}>

  constructor() {
    this.clientDbPromise = initialize();
  }

  register(user: User): Promise<boolean> {
    return this
      .clientDbPromise
      .then(({ client, db }) => register(client, db, user));
  }

  authenticate(username: string, password: string): Promise<Role | undefined> {
    return this
      .clientDbPromise
      .then(({ db }) => authenticate(db, username, password));
  }

  getStudent(username: string): Promise<Student | undefined> {
    return this
      .clientDbPromise
      .then(({ db }) => getStudent(db, username));
  }

  getStudents(): Promise<Student[]> {
    return this
    .clientDbPromise
    .then(({ db }) => getStudents(db));
  }

  getQuestions(): Promise<(Question & { id: string })[]> {
    return this
    .clientDbPromise
    .then(({ db }) => getQuestions(db));
  }

  addQuestion(question: Question): Promise<void> {
    return this
    .clientDbPromise
    .then(({ db }) => addQuestion(db, question));
  }

  addAnswers(username: string, ans: Answer[]): Promise<void> {
    return this
    .clientDbPromise
    .then(({ db }) => addAnswers(db, username, ans));
  }

  evaluateStudent(username: string, marks: number): Promise<void> {
    return this
    .clientDbPromise
    .then(({ db }) => evaluateStudent(db, username, marks));
  }
}

export default Database;