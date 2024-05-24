import pkg from "mongoose";
const { connect, connection, disconnect } = pkg;

const uri = "mongodb+srv://henriquerojo10:yX2Un5pykobjainV@cluster-01.2vzhhel.mongodb.net/alunos?retryWrites=true&w=majority&appName=Cluster-01";

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
