// Import AWS SDK
const AWS = require('aws-sdk');
// Set the Region 
AWS.config.update({ region: process.env.AWS_REGION });
// Create S3 instance
const s3 = new AWS.S3();
//Bucket
const bucket = process.env.AWS_BUCKET;

