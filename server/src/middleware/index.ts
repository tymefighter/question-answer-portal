import express, { Express } from 'express';

export default function addMiddleware(app: Express) {
  app.use(express.static('client/build'));
}