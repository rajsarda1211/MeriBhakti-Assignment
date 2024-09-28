const cron = require('node-cron');
const AWS = require('aws-sdk');
const Data = require('../models/dataModel');

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const processSqsMessage = async (message, io) => {
  try {
    const { dataId } = JSON.parse(message.Body);
    const data = await Data.findById(dataId);

    if (data) {
      // Perform the word count calculation
      data.calculatedField = `Word Count: ${data.description.split(' ').length}`;
      await data.save();

      // Emit the updated data to all connected clients
      io.emit('dataUpdated', data);
    }

    // Delete the message from SQS queue
    const deleteParams = {
      QueueUrl: process.env.SQS_QUEUE_URL,
      ReceiptHandle: message.ReceiptHandle,
    };
    await sqs.deleteMessage(deleteParams).promise();
  } catch (error) {
    console.error('Error processing SQS message:', error.message);
  }
};

const fetchMessagesFromSQS = async (io) => {
  const params = {
    QueueUrl: process.env.SQS_QUEUE_URL,
    MaxNumberOfMessages: 10,
    WaitTimeSeconds: 10,
  };

  try {
    const data = await sqs.receiveMessage(params).promise();
    if (data.Messages) {
      for (const message of data.Messages) {
        await processSqsMessage(message, io);
      }
    }
  } catch (error) {
    console.error('Error fetching messages from SQS:', error.message);
  }
};

module.exports = (io) => {
  cron.schedule('* * * * *', () => fetchMessagesFromSQS(io));
};
