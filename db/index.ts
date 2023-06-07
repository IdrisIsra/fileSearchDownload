import { drizzle } from "drizzle-orm/postgres-js"
import * as schema from "./schema"
import postgres from "postgres"

const connectionString = process.env.DB_CONNECTION_STRING

const client = postgres(connectionString!)
export const db = drizzle(client, { schema })
