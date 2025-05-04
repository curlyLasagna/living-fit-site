import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";
import * as schema from "./schema.ts";

async function main() {
    const db = drizzle(process.env.DB_URL ?? "postgresql://admin:group6@localhost:5432/living_fit")

    await seed(db, schema);
    console.log("Database seeded successfully!");

}

main().catch((err) => {
    console.error("Error seeding database:", err);
    process.exit(1);
});