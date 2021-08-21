import * as express from 'express';
import * as cors from 'cors';

type Mode = 'PRODUCTION' | 'DEVELOPMENT';

export default function addMiddleware(app: express.Express, mode: Mode) {

  if(mode === 'PRODUCTION')
    app.use(express.static('client/build'));
  else
    app.use(cors());
}