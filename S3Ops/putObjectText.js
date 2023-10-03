const AWS = require("aws-sdk");

const s3 = new AWS.S3();

(async () => {
  await s3
    .putObject({
      Body: "Hello world!",
      Bucket: "myverybigbucket",
      Key: "my-file.txt",
    })
    .promise()
    .then(() => {
      console.log("Successfully uploaded data to my-bucket/my-key");
    })
    .catch((error) => {
      console.error(error);
    });
})();
