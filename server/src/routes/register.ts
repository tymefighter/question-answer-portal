import * as express from 'express';

import Database from '../database';
import { isUser } from '../database/types/guards';

export default function addRegisterRoute(database: Database, app: express.Express) {

  app
    .route('/register')
    .post(
      express.json(),
      (req, res) => {
        const user = req.body;

        if(!isUser(user)) {
          res
            .status(400)
            .end('Request body must contain username, password and role');
          return;
        }

        database
          .register(user)
          .then(isRegistrationSuccessful => {
            if(isRegistrationSuccessful)
              res
                .status(200)
                .end('Registration Successful');

            else
              res
                .status(409)
                .end('Username already taken');
          });
      }
    );
}