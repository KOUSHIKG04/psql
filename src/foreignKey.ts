import { getClient } from "./index";

async function userAddress(user_id: number, city: string, state: string, country: string, pincode: string) {
    const client = await getClient();
    try {
        const res = await client.query(`CREATE TABLE IF NOT EXISTS address (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            country VARCHAR(255) NOT NULL,
            pincode VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )`);
        console.log("Table created successfully:", res);
    } catch (err) {
        console.error("Error creating table:", err);
    } finally {
        await client.end();
    }
}

userAddress(1, "testcity", "teststate", "testcountry", "testpincode").catch(console.error);
