import { getClient } from "./index";

async function insertUser(username: string, email: string, password: string) {
    const client = await getClient();
    try {
        const res = await client.query(
            `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id`,
            [username, email, password]
        );
        console.log("User inserted successfully:", res.rows[0]);
    } catch (err) {
        console.error("Error inserting user:", err);
    } finally {
        await client.end();
    }
}

insertUser("testuser", "l9Y9f@example.com", "testpassword").catch(console.error);