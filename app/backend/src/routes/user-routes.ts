import type { Router } from "express";
import { createRouter } from "../utils/create";
import { handleAddMember } from "../controllers/user-controller";

import { db } from "../utils/db";
import { sql } from "drizzle-orm";

export default createRouter((router: Router) => {
  router.post("/register", handleAddMember);

  // Get all database tables
  router.get("/tables", async (req, res) => {
    try {
      const tables = await db.execute(sql`
        SELECT 
          t.table_name,
          array_agg(
            jsonb_build_object(
              'column_name', c.column_name,
              'data_type', c.data_type,
              'is_nullable', c.is_nullable
            )
          ) as columns
        FROM information_schema.tables t
        JOIN information_schema.columns c 
          ON c.table_name = t.table_name
        WHERE t.table_schema = 'public'
        GROUP BY t.table_name
      `);

      res.json({
        success: true,
        tables,
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  // Get All users from the db
  router.get("/all", async (req, res) => {
    try {
      const users = await db.execute(sql`
        SELECT * FROM members
      `);

      res.json({
        success: true,
        users: users.rows,
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });
});
