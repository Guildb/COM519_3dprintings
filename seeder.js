const { MongoClient } = require("mongodb");
require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");
const { MONGODB_URI } = process.env;

const client = new MongoClient(MONGODB_URI);

async function main() {
    try {
      await client.connect();
      const db = client.db();
      const results = await db.collection("user").find({}).count();
  
      /**
       * If existing records then delete the current collections
       */
      if (results) {
        db.dropDatabase();
      }

      /**
       * Import the JSON data into the database
       */
  
      const data = await fs.readFile(path.join(__dirname, "user.json"), "utf8");
      await db.collection("user").insertOne(JSON.parse(data));

      process.exit();
    } catch (error) {
      console.error("error:", error);
      process.exit();
    }
  }
  
  main();