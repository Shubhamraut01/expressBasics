const { MongoClient, ObjectId } = require("mongodb");
const uri = require("./atlas_uri");
const client = new MongoClient(uri);

// Collection
const accounts = client.db("bank").collection("accounts");
const transfers = client.db("bank").collection("transfers");

// Account information

let account_id_sender = "MDB23523525";
let account_id_receiver = "MDB23523526";
let transaction_amount = 1000;

// Start the client session all transaction will be done in this session if one of the task fails whole session will fail this is called atomacity
const session = client.startSession();

const main = async () => {
  try {
    const transactionResults = await session.withTransaction(async () => {
      //step 1 : update the account sender balance
      const updateSenderResults = await accounts.updateOne(
        { account_id: account_id_sender },
        { $inc: { balance: -transaction_amount } },
        { session }
      );
      console.log(
        `${updateSenderResults.matchedCount} document(s) matched the filter, updated ${updateSenderResults.modifiedCount} document(s) for the sender account`
      );

      //  Step 2: Update the account reciver balance
      const updateReceiverResults = await accounts.updateOne(
        { account_id: account_id_receiver },
        { $inc: { balance: transaction_amount } },
        { session }
      );
      console.log(
        `${updateReceiverResults.matchedCount} document(s) matched the filter , updated ${updateReceiverResults.modifiedCount} document(s) for the receiver`
      );

      // Step 3 : Insert the transfer document
      const transfer = {
        transfer_id: "TR234352355",
        amount: 100,
        from_account: account_id_sender,
        to_account: account_id_receiver,
      };

      const insertTransferResults = await transfers.insertOne(transfer, {
        session,
      });
      console.log(
        `Succesfully inserted ${insertTransferResults.insertedId} Into transfers collection`
      );

      //Step 4 Update the transefer_complete field for the sender account
      const updateTransferCompleteResults = await accounts.updateOne(
        { account_id: account_id_sender },
        { $push: { transfers_complete: transfer.transfer_id } },
        { session }
      );
      console.log(
        `${updateTransferCompleteResults.matchedCount} document(s) matched in the transfer collection , updated ${updateSenderResults.modifiedCount}`
      );
      //Step 5 Update the transfers-complete field for the receiver account
      const updateReceiverTransferResults = await accounts.updateOne(
        { account_id: account_id_receiver },
        { $push: { transfers_complete: transfer.transfer_id } },
        { session }
      );
      console.log(
        `${updateReceiverTransferResults.matchedCount} document(s) matched in the transfer collection , updated ${updateReceiverTransferResults.modifiedCount}`
      );
    });
    console.log("Commiting transaction ... ");
    // If the callback for withTransaction returns successfully without throwing an error, the transaction will be committed
    if (transactionResults) {
      console.log("Transaction committed.");
    } else {
      console.log("Transaction aborted.");
    }
  } catch (err) {
    console.error(
      console.error(`Transaction aborted: ${err}`),
      process.exit(1)
    );
  } finally {
    await session.endSession();
    await client.close();
  }
};
main();
