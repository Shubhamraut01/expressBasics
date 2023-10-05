import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb"; // ES Modules import


//login to aws
        const config = {
          region: import.meta.env.VITE_AWS_REGION,
          credentials: {
            accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
            secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
          },
        };

//creating client
        const client = new DynamoDBClient(config);


// getting data ready for db
        const item = {
          TableName: import.meta.env.VITE_AWS_DYNAMODB_POLLS,
          Item: {
            id: { S: uuidv4() }, //primary key random generation using uuid
            stageId: { S: data.item.stageId }, //sorting key , s stands for string N for no 
            question: { S: obj.question }, //working verified
            answers: { SS: obj.answers }, //ss means string set s means string
            correctIndex: { N: obj.correctIndex.toString() }, //working verified
            userAnswer: { S: q.textContent },
          },
        };
// sending data
        async function putItemToDynamoDB(item) {
          const putItemCommand = new PutItemCommand(item);
          try {
            const response = await client.send(putItemCommand);
            console.log("PutItem succeeded:", response);
            return response;
          } catch (error) {
            console.error("Error putting item:", error);
            throw error;
          }
        }
// Call the putItemToDynamoDB function with the item

        putItemToDynamoDB(item);
