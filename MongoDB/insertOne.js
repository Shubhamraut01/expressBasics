const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri");

console.log("uri", uri);

const client = new MongoClient(uri);
const dbname = "bank";
const collection_name = "accounts";

const accountsCollection = client.db(dbname).collection(collection_name);

// connect to database
const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`connected to the ${dbname} database`);
  } catch (err) {
    console.log(err);
  }
};

//demo data
const sampleAccount = {
  account_holder: "Shubham Raut",
  account_number: "1234567890",
  balance: 1000000,
  last_updated: new Date(),
};

const main = async () => {
  try {
    await connectToDatabase();
    let result = await accountsCollection.insertOne(sampleAccount);
    console.log(`inserted document : ${result.insertedId}`);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};
main();
