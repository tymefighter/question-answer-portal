import * as express from 'express';

export default function addMiddleware(app: express.Express) {
  app.use(express.static('client/build'));
}