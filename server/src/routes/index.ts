import * as express from 'express';
import Database from "../database";

import addLoginRoute from "./login";
import addRegisterRoute from "./register";
import addAddAnswersRoute from "./addAnswers";
import addAddQuestionRoute from "./addQuestion";
import addGetQuestionsRoute from "./getQuestions";
import addGetStudentsRoute from "./getStudents";
import addGetStudentRoute from './getStudent';
import addEvaluateStudentRoute from './evaluateStudent';

export default function addRoutes(database: Database, app: express.Express) {
  [
    addLoginRoute,
    addRegisterRoute,
    addAddAnswersRoute,
    addAddQuestionRoute,
    addGetQuestionsRoute,
    addGetStudentsRoute,
    addGetStudentRoute,
    addEvaluateStudentRoute
  ]
    .forEach(addRoute => addRoute(database, app));
}