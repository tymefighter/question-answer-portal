import * as express from 'express';

import Database from '../database';
import { Role, User } from '../database/types';

export interface RequestWithUserInfo extends express.Request { 
  user?: User;
};

export const authenticateAndAuthorize = 
  (database: Database, allowedRoles: Role[]) => 
  (req: RequestWithUserInfo, res: express.Response, next: express.NextFunction) => {

    const authHeader = req.header('Authorization');
    if(authHeader === undefined) {
      res
        .status(401)
        .set('WWW-Authenticate', 'Basic')
        .end('Authentication header missing');
      return;
    }

    const encodedUsernameAndPassword = authHeader.split(' ')[1];
    const buffer = Buffer.from(encodedUsernameAndPassword, 'base64');
    const [username, password] = buffer
      .toString('utf-8')
      .split(':');

    database
      .authenticate(username, password)
      .then(role => {
        if(role !== undefined && allowedRoles.includes(role)) {
          req.user = { username, password, role };
          next();
        }
        else res
          .status(401)
          .end('You are not authorized to perform this action');
      })
  };