import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

import * as auth from "./schema/auth";
import * as workspace from "./schema/workspace";

export const schema = { ...auth, ...workspace };

export { pgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

export * from "./utils";

const queryPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(queryPool, { schema });

// >>> Migrate
try {
  console.log(">>> Migration Start");
  await migrate(db, {
    migrationsFolder: "../../packages/db/drizzle",
  });

  console.log(">>> Migration Complete");
} catch (error) {
  console.log(error);
}
