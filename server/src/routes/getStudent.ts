import * as express from 'express';
import { authenticateAndAuthorize, RequestWithUserInfo } from './helper';

import Database from '../database';
import { Role } from '../database/types';

export default function addGetStudentRoute(
  database: Database, app: express.Express,
) {
  app
    .route('/students/:username')
    .get(
      authenticateAndAuthorize(database, ['STUDENT', 'EVALUATOR']), 
      (req: RequestWithUserInfo, res) => {
        const role = req.user?.role as Role;

        if(role === 'STUDENT' && req.user?.username !== req.params.username) {
          res
            .status(401)
            .end('You cannot access another student\'s information');
          return;
        }

        database
          .getStudent(req.params.username)
          .then(student => {
            if(student === undefined)
              res
                .status(404)
                .end(`Student with username ${req.params.username} does not exist`);

            else 
              res
                .status(200)
                .json(student);
          })
      }
    );
}