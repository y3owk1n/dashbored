import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client } from "pg";

try {
  const migrationClient = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await migrationClient.connect();

  await migrate(drizzle(migrationClient), { migrationsFolder: "drizzle" });
  console.log(`Migration completed`);
  process.exit(0);
} catch (error) {
  console.log(`Migration failed!`, error);
  process.exit(1);
}
