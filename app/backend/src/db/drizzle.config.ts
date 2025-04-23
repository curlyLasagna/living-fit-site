// .drizzle.config.ts
import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL ?? "postgresql://admin:group6@localhost:5432/living_fit"
  }
} satisfies Config;
