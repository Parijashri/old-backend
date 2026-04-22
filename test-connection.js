// test-connection.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected successfully!");
    await client.db("admin").command({ ping: 1 });
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
  } finally {
    await client.close();
  }
}
run();