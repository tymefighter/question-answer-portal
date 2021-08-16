import * as express from 'express';
import { authenticateAndAuthorize } from './helper';

import Database from '../database';

export default function addGetQuestionsRoute(database: Database, app: express.Express) {
  app
    .route('/questions')
    .get(
      authenticateAndAuthorize(database, ['STUDENT', 'SETTER', 'EVALUATOR']), 
      (req, res) => {
        database
          .getQuestions()
          .then(questionsWithId => {
            res
              .status(200)
              .json(questionsWithId);
          })
      }
    );
}