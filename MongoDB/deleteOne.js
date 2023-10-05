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

const documentToDelete = { _id: new ObjectId("64fe0b28f6802728b3ff9df1") };

const main = async () => {
  try {
    await connectToDatabase();
    let result = await accountsCollection.deleteOne(documentToDelete);
    result.deletedCount === 1
      ? console.log(`deleted 1 documents`)
      : console.log("no doc updated");
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};
main();
