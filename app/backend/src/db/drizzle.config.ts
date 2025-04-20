// .drizzle.config.ts
import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'localhost',
    port: 5432,
    ssl: false,
    user: "admin",
    password: "group6",
    database: "living_fit",
  },
} satisfies Config;
