import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

export async function getClient() {
    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: 5432,
    });
    await client.connect();
    return client
}


async function createUserTable() {
    const client = await getClient(); 
    try {
        const res = await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Table created successfully:", res);
    } catch (err) {
        console.error("Error creating table:", err);
    } finally {
        await client.end(); 
    }
}

createUserTable();
