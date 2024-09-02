import { getClient } from "./index";

async function getUser(email: String) {
    const client = await getClient();
    try {
        const res = await client.query(`SELECT * FROM users WHERE email = $1`, [email]);
        console.log("User found:", res.rows[0]);
    } catch (err) {
        console.error("Error finding user:", err);
    } finally {
        await client.end();
    }
}
getUser("l9Y9f@example.com").catch(console.error)