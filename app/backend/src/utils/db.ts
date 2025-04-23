import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle(process.env.DB_URL ?? "postgresql://admin:group6@localhost:5432/living_fit")