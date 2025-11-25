import { Pool } from "pg";
//Aqui você deve colocar os dados do seu bd para realizar a conecção
export const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Compromissos",
    password: "abc",//Altere a senha
    port: 5432
})