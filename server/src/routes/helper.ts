import express from 'express';
import Database from 'database';

import { Role } from 'database/types';

export const authenticateAndAuthorize = 
  (database: Database, allowedRoles: Role[]) => 
  (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const authHeader = req.header('Authorization');
    if(authHeader === undefined) {
      res
        .status(401)
        .setHeader('WWW-Authenticate', 'Basic')
        .end('');
      return;
    }

    const encodedUsernameAndPassword = authHeader.split(' ')[1];
    const buffer = Buffer.from(encodedUsernameAndPassword);
    const [username, password] = buffer
      .toString('base64')
      .split(':');

    database
      .authenticate(username, password)
      .then(role => {
        if(role !== undefined && allowedRoles.includes(role)) next();
        else res
          .status(401)
          .end('You are not authorized to perform this action');
      })
  };