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

const documentsToFind = { balance: { $gt: 4700 } };

const main = async () => {
  try {
    await connectToDatabase();
    let result = await accountsCollection.find(documentsToFind);
    let docCount = accountsCollection.countDocuments(documentsToFind);
    await result.forEach((doc) => console.log(doc));
    console.log(`found ${await docCount} documents`);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};
main();
