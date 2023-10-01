import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";

dotenv.config({
  path: "../../.env",
});

async function migrateClient() {
  try {
    console.log(">>> Migration Start on ", process.env.DATABASE_URL);
    const migrationClient = new pg.Client({
      connectionString: process.env.DATABASE_URL,
    });

    await migrationClient.connect();

    await migrate(drizzle(migrationClient), { migrationsFolder: "drizzle" });
    console.log(`>>> Migration completed`);
    process.exit(0);
  } catch (error) {
    console.log(`>>> Migration failed!`, error);
    process.exit(1);
  }
}

migrateClient().catch(() => console.log("error"));
