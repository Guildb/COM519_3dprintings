const { MongoClient } = require("mongodb");

require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
const { MONGODB_URI, MONGODB__PRODUCTION_URI } = process.env;
const client = new MongoClient(
  process.env.NODE_ENV === "production" ? MONGODB__PRODUCTION_URI : MONGODB_URI
);

async function main() {
  try {
    await client.connect();
    const db = client.db();

    const userResults = await db.collection("users").find({}).count();
    /**
     * If existing records then delete the current collections
     */
    if (userResults) {
      db.dropDatabase();
    }

    const typeResults = await db.collection("types").find({}).count();
    /**
     * If existing records then delete the current collections
     */
    if (typeResults) {
      db.dropDatabase();
    }

    const projectResults = await db.collection("projects").find({}).count();
    /**
     * If existing records then delete the current collections
     */
    if (projectResults) {
      db.dropDatabase();
    }

    /**
     * Import the JSON data into the database
     */

    const userData = await fs.readFile(path.join(__dirname, "user.json"), "utf8");
    await db.collection("users").insertOne(JSON.parse(userData));

    const typesData = await fs.readFile(path.join(__dirname, "types.json"), "utf8");
    await db.collection("types").insertMany(JSON.parse(typesData));

    process.exit();
  } catch (error) {
    console.error("error:", error);
    process.exit();
  }
}

main();