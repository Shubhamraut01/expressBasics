// npm i mongodb

const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://shubham:shubham123@cluster0.fmz8bi7.mongodb.net/test?retryWrites=true&w=majority";

console.log("uri", uri);

const client = new MongoClient(uri);
const dbname = "Cluster0";

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`connected to the ${dbname} database`);
  } catch (err) {
    console.log(err);
  }
};

const main = async () => {
  try {
    await connectToDatabase();
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};
main();
