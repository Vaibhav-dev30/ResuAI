import pg from 'pg';
import fs from 'fs';
import path from 'path';
import fileURLToPath from 'url';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;

async function runMigration() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('❌ Error: DATABASE_URL is missing in server/.env');
    process.exit(1);
  }

  console.log('🔌 Connecting to database using connection string...');
  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false // Required for Supabase connections
    }
  });

  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL database successfully.');

    const schemaPath = path.resolve(process.cwd(), 'db/schema.sql');
    console.log(`📖 Reading schema file from: ${schemaPath}`);
    const sql = fs.readFileSync(schemaPath, 'utf8');

    console.log('⚡ Executing database initialization schema...');
    await client.query(sql);
    console.log('🎉 Database tables initialized successfully!');

  } catch (error) {
    console.error('❌ Error during database initialization:', error);
  } finally {
    await client.end();
  }
}

runMigration();
