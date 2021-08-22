import * as express from 'express';
import { authenticateAndAuthorize, RequestWithUserInfo } from './helper';

import Database from '../database';

export default function addEvaluateStudentRoute(database: Database, app: express.Express) {
  app
    .route('/evaluateStudent')
    .post(
      authenticateAndAuthorize(database, ['EVALUATOR']),
      express.json(), 
      (req: RequestWithUserInfo, res) => {
        const { username, marks } = req.body;

        if(typeof username !== 'string' || typeof marks !== 'number') {
          res
            .status(400)
            .end('Request body must contain the user\'s username and marks');
          return;
        }

        database
          .evaluateStudent(username, marks)
          .then(() => {
            res
              .status(200)
              .end('Student successfully evaluated');
          });
      }
    );
}