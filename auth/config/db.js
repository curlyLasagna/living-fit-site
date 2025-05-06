// config/db.js
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

const sqlite = new Database('auth.db'); // hopefully if its not missing
const db = drizzle(sqlite);

export default db;
