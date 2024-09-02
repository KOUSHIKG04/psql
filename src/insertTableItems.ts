import { getClient } from "./index";

async function insertAddress(user_id: number, city: string, state: string, country: string, pincode: string) {
    const client = await getClient();
    try {
        const res = await client.query(
            `INSERT INTO address (user_id, city, state, country, pincode) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
            [user_id, city, state, country, pincode]
        );
        console.log("Address inserted successfully:", res.rows[0]);
    } catch (err) {
        console.error("Error inserting address:", err);
    } finally {
        await client.end();
    }

} 

insertAddress(1, "New York", "NY", "USA", "10001").catch(console.error);
