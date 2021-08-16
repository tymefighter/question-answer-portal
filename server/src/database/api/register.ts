import * as mongodb from 'mongodb';

import { Student, User } from '../types';

export default async function register(
  client: mongodb.MongoClient, db: mongodb.Db, user: User
) {
  const session = client.startSession();
  let isRegistrationSuccessful = false;

  await session
    .withTransaction(async () => {
      const users = db.collection('users');

      const foundUser = await users.findOne({ username: user.username });
      
      if(foundUser === undefined) {
        await users.insertOne(user);

        if(user.role === 'STUDENT') {
          const students = db.collection('students');
          const student: Student = {
            username: user.username,
            attempted: false,
            ans: [],
            evaluated: false,
            marks: 0
          };
          await students.insertOne(student);
        }

        isRegistrationSuccessful = true;
      }
    })
    .finally(() => {
      session.endSession();
    });

  return isRegistrationSuccessful;
};