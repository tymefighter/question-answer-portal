import mongodb from 'mongodb';

import { User } from 'database/types';

export default function register(
  client: mongodb.MongoClient, db: mongodb.Db, user: User
) {
  const session = client.startSession();

  return session
    .withTransaction(async () => {
      const users = db.collection('users');

      const foundUser = await users.findOne({ username: user.username });
      
      if(foundUser === undefined) {
        await users.insertOne(user);
        return true;
      }

      else return false;  
    })
    .finally(() => {
      session.endSession();
    });
};