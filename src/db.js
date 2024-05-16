import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const {
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME,
} = process.env;

const url = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?authSource=admin`;

console.log(url);

const client = new MongoClient(url);

client.connect().then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error(err);
});

const db = client.db(DB_NAME);

export default db;
