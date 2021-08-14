import mongodb from 'mongodb';

const MONGO_URL = 'mongodb://localhost:27017'
const DB_NAME = 'quiz';

function initialize() {

  const client = new mongodb.MongoClient(MONGO_URL);
  const db = client.db(DB_NAME);

  return { client, db };
}

export default initialize;