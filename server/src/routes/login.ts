import * as express from 'express';
import { authenticateAndAuthorize } from './helper';

import Database from '../database';

export default function addLoginRoute(database: Database, app: express.Express) {
  app
    .route('/login')
    .post(
      authenticateAndAuthorize(database, ['STUDENT', 'SETTER', 'EVALUATOR']), 
      (req, res) => {
        res
          .status(200)
          .end('Login Successful');
      }
    );
}