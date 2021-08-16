import * as express from 'express';
import { authenticateAndAuthorize } from './helper';

import Database from '../database';

export default function addGetStudentsRoute(database: Database, app: express.Express) {
  app
    .route('/students')
    .get(
      authenticateAndAuthorize(database, ['EVALUATOR']), 
      (req, res) => {
        database
          .getStudents()
          .then(students => {
            res
              .status(200)
              .json(students);
          })
      }
    );
}