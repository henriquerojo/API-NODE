import pkg from "mongoose";
const { connect, connection, disconnect } = pkg;

const uri = process.env.MONGO_DB_URL;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await connect(uri, clientOptions);
    await connection.db.admin().command({ ping: 1 });
    console.log("Database conected");
  } catch (error) {
    // Ensures that the client will close when you finish/error
    console.log("Error: ", error)
  }
}
run().catch(console.dir);
