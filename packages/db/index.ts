import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import * as auth from "./schema/auth";
import * as post from "./schema/post";

export const schema = { ...auth, ...post };

export { pgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

const queryClient = postgres(process.env.DATABASE_URL!);

export const db = drizzle(queryClient, { schema });

const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });

await migrate(drizzle(migrationClient), {
  migrationsFolder: "../../packages/db/drizzle",
});
