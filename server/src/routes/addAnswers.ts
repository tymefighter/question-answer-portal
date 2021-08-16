import * as express from 'express';
import { authenticateAndAuthorize, RequestWithUserInfo } from './helper';

import Database from '../database';
import { isAnswers } from '../database/types/guards';

export default function addAddAnswersRoute(database: Database, app: express.Express) {
  app
    .route('/answers')
    .post(
      authenticateAndAuthorize(database, ['STUDENT']),
      express.json(),
      (req: RequestWithUserInfo, res) => {
        const ans = req.body;

        if(!isAnswers(ans)) {
          res
            .status(400)
            .end('Request body must contain the answers');
          return;
        }

        database
          .addAnswers(req.user?.username as 'string', ans)
          .then(() => {
            res
              .status(200)
              .end('Answers Successfully added');
          });
      }
    );
}