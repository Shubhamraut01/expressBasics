const { MongoClient, ObjectId } = require("mongodb");
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

const documentsToUpdate = { account_type: "checking" };
const update = { $push: { transfer_complete: "TR413308000" } };

const main = async () => {
  try {
    await connectToDatabase();
    let result = await accountsCollection.updateMany(documentsToUpdate, update);
    result.matchedCount > 0
      ? console.log(`updated ${result.modifiedCount} documents`)
      : console.log("no doc updated");
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};
main();
