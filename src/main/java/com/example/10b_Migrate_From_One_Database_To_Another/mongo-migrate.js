import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:27017`;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db(process.env.MONGO_DB || 'mymongodb');

    // Create "users" collection
    await db.createCollection('users');
    console.log('✅ Created "users" collection');

    // Create "products" collection
    await db.createCollection('products');
    console.log('✅ Created "products" collection');

    // Optionally: Add indexes or validation here
    // e.g., await db.collection('users').createIndex({ first_name: 1 });

  } catch (err) {
    console.error('❌ Migration error:', err);
  } finally {
    await client.close();
  }
}

run();
