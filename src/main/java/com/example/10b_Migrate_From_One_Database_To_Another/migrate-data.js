import knex from 'knex';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Knex config for PostgreSQL
const pg = knex({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  }
});

// Mongoose config for MongoDB
const mongoUri = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:27017/${process.env.MONGO_DB}?authSource=admin`;
await mongoose.connect(mongoUri);

// Mongo Schemas
const User = mongoose.model('User', new mongoose.Schema({
  id: Number,
  first_name: String,
  last_name: String
}));

const Product = mongoose.model('Product', new mongoose.Schema({
  id: Number,
  name: String,
  price: mongoose.Schema.Types.Decimal128
}));

// Migration logic
async function migrate() {
  try {
    console.log('🔄 Migrating users...');
    const users = await pg.select('*').from('users');
    await User.insertMany(users);
    console.log(`✅ Migrated ${users.length} users`);

    console.log('🔄 Migrating products...');
    const products = await pg.select('*').from('products');
    await Product.insertMany(products);
    console.log(`✅ Migrated ${products.length} products`);

  } catch (err) {
    console.error('❌ Migration failed:', err);
  } finally {
    await mongoose.disconnect();
    await pg.destroy();
    console.log('🏁 Done');
  }
}

migrate();
