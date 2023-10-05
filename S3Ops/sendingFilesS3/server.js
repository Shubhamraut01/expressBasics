const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

// Set your AWS credentials and S3 bucket information
AWS.config.update({
  accessKeyId: "",
  secretAccessKey: "",
  region: "ap-south-1", // e.g., 'us-east-1'
});

const s3 = new AWS.S3();
const folderPath = "./testfile"; // folder where your files are
const bucketName = "my-big-buck";
const folderPrefix = "vivek/"; // folder for s3

function uploadFileToS3(filePath) {
  const params = {
    Bucket: bucketName,
    Key: `${folderPrefix}${path.basename(filePath)}`, // Define the S3 key where you want to store the file
    Body: fs.createReadStream(filePath),
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error("Error uploading file:", err);
    } else {
      console.log("File uploaded successfully:", data.Location);
    }
  });
}

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error("Error reading folder:", err);
    return;
  }

  // Iterate through the files in the folder and upload each one to S3
  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    uploadFileToS3(filePath);
  });
});
