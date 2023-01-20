const { MongoClient, ObjectId } = require("mongodb");

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

    const orderResults = await db.collection("orders").find({}).count();
    /**
     * If existing records then delete the current collections
     */
    if (orderResults) {
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

    const typesData = await fs.readFile(path.join(__dirname, "types.json"), "utf8");
    await db.collection("types").insertMany(JSON.parse(typesData));

    const usersData = await fs.readFile(path.join(__dirname, "users.json"), "utf8");
    await db.collection("users").insertMany(JSON.parse(usersData));

    const projectsData = await fs.readFile(path.join(__dirname, "projects.json"), "utf8");
    await db.collection("projects").insertMany(JSON.parse(projectsData));

    const ordersData = await fs.readFile(path.join(__dirname, "orders.json"), "utf8");
    await db.collection("orders").insertMany(JSON.parse(ordersData));

    const users = db.collection("users").find({name: "Renato"});
    const updateusers = await users.toArray();
    var newid = null
    updateusers.forEach(async ({ _id}) => {
      newid = _id
    });
    await db.collection("orders").updateMany({buyer_name: "Renato"}, [
      {
        $set: {
          user_id: newid
        },
      },
    ]);

    const projects = db.collection("projects").find({name: "MJOLNIR GOD OF WAR"});
    const updateprojects = await projects.toArray();
    var newid = null
    updateprojects.forEach(async ({ _id}) => {
      newid = _id
    });
    await db.collection("orders").updateMany({status: 0}, [
      {
        $set: {
          project_id: newid
        },
      },
    ]);

    const projects2 = db.collection("projects").find({name: "Addams Family Thing"});
    const updateprojects2 = await projects2.toArray();
    var newid = null
    updateprojects2.forEach(async ({ _id}) => {
      newid = _id
    });
    await db.collection("orders").updateMany({status: 1}, [
      {
        $set: {
          project_id: newid
        },
      },
    ]);


    const type = db.collection("types").find({type: "Art"});
    const typel = await type.toArray();
    var newid = null
    typel.forEach(async ({ _id}) => {
      newid = _id
    });
    await db.collection("projects").updateMany({name: "3D PRINTED TESLA NEON SIGN"}, [
      {
        $set: {
          type_id: newid
        },
      },
    ]);

    const type1 = db.collection("types").find({type: "Jewelry"});
    const typel1 = await type1.toArray();
    var newid = null
    typel1.forEach(async ({ _id}) => {
      newid = _id
    });
    await db.collection("projects").updateMany({name: "EARRING STL CAD FILE 2$"}, [
      {
        $set: {
          type_id: newid
        },
      },
    ]);
    
    const type2 = db.collection("types").find({type: "Home"});
    const typel2 = await type2.toArray();
    var newid = null
    typel2.forEach(async ({ _id}) => {
      newid = _id
    });
    await db.collection("projects").updateMany({name: "EGG CUP"}, [
      {
        $set: {
          type_id: newid
        },
      },
    ]);

    const type3 = db.collection("types").find({type: "Architecture"});
    const typel3 = await type3.toArray();
    var newid = null
    typel3.forEach(async ({ _id}) => {
      newid = _id
    });
    await db.collection("projects").updateMany({name: "HYPERBOLIC PARABOLOID"}, [
      {
        $set: {
          type_id: newid
        },
      },
    ]);

    const type4 = db.collection("types").find({type: "Gadget"});
    const typel4 = await type4.toArray();
    var newid = null
    typel4.forEach(async ({ _id}) => {
      newid = _id
    });
    await db.collection("projects").updateMany({name: "SUPPORT FOR CELL PHONES"}, [
      {
        $set: {
          type_id: newid
        },
      },
    ]);

    const type5 = db.collection("types").find({type: "Game"});
    const typel5 = await type5.toArray();
    var newid = null
    typel5.forEach(async ({ _id}) => {
      newid = _id
    });
    await db.collection("projects").updateMany({name: "MJOLNIR GOD OF WAR"}, [
      {
        $set: {
          type_id: newid
        },
      },
    ]);

    const type6 = db.collection("types").find({type: "Tools"});
    const typel6 = await type6.toArray();
    var newid = null
    typel6.forEach(async ({ _id}) => {
      newid = _id
    });
    await db.collection("projects").updateMany({name: "1-18 SCALE CONE"}, [
      {
        $set: {
          type_id: newid
        },
      },
    ]);

    const type7 = db.collection("types").find({type: "Learning"});
    const typel7 = await type7.toArray();
    var newid = null
    typel7.forEach(async ({ _id}) => {
      newid = _id
    });
    await db.collection("projects").updateMany({name: "DNA with X-ray Diffraction"}, [
      {
        $set: {
          type_id: newid
        },
      },
    ]);

    const type8 = db.collection("types").find({type: "Sculptures"});
    const typel8 = await type8.toArray();
    var newid = null
    typel8.forEach(async ({ _id}) => {
      newid = _id
    });
    await db.collection("projects").updateMany({name: "Addams Family Thing"}, [
      {
        $set: {
          type_id: newid
        },
      },
    ]);

    const type9 = db.collection("types").find({type: "Toys"});
    const typel9 = await type9.toArray();
    var newid = null
    typel9.forEach(async ({ _id}) => {
      newid = _id
    });
    await db.collection("projects").updateMany({name: "Flexi Rex with stronger links"}, [
      {
        $set: {
          type_id: newid
        },
      },
    ]);

    const type10 = db.collection("types").find({type: "Fashion"});
    const typel10 = await type10.toArray();
    var newid = null
    typel10.forEach(async ({ _id}) => {
      newid = _id
    });
    await db.collection("projects").updateMany({name: "CROC TOBASCO HOLDER ACCESSORY "}, [
      {
        $set: {
          type_id: newid
        },
      },
    ]);
    



    process.exit();
  } catch (error) {
    console.error("error:", error);
    process.exit();
  }
}

main();