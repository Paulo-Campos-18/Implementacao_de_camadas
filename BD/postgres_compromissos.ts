import { Pool } from "pg";

export const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Compromissos",
    password: "abc",
    port: 5432
})