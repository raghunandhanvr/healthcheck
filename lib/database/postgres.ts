import { Pool } from "pg"

export const pgConnection = new Pool({
  connectionString: process.env.DATABASE_URL,
})
