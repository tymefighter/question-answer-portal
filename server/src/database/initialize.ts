import * as mongodb from 'mongodb';

const MONGO_URL = 'mongodb://localhost:27017'
const DB_NAME = 'quiz';

async function initialize() {

  const client = await mongodb.MongoClient.connect(MONGO_URL);
  const db = client.db(DB_NAME);

  return { client, db };
}

export default initialize;