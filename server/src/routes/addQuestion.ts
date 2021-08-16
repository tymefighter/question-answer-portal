import * as express from 'express';
import { authenticateAndAuthorize } from './helper';

import Database from '../database';
import { isQuestion } from '../database/types/guards';

export default function addAddQuestionRoute(database: Database, app: express.Express) {
  app
    .route('/questions')
    .post(
      authenticateAndAuthorize(database, ['SETTER']), 
      express.json(),
      (req, res) => {
        const question = req.body;

        if(!isQuestion(question)) {
          res
            .status(400)
            .end('Request body must have a question field');
          return;
        }

        database
          .addQuestion(question)
          .then(() => {
            res
              .status(200)
              .end('Question Successfully added');
          });
      }
    );
}