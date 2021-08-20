import * as express from 'express';
import { authenticateAndAuthorize, RequestWithUserInfo } from './helper';

import Database from '../database';
import { Role } from '../database/types';

export default function addLoginRoute(database: Database, app: express.Express) {
  app
    .route('/login')
    .post(
      authenticateAndAuthorize(database, ['STUDENT', 'SETTER', 'EVALUATOR']), 
      (req: RequestWithUserInfo, res) => {
        res
          .status(200)
          .json({ role: (req.user?.role as Role) });
      }
    );
}