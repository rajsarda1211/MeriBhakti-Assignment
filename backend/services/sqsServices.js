const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

exports.sendMessageToSQS = async (dataId) => {
  const params = {
    MessageBody: JSON.stringify({ dataId }),
    QueueUrl: process.env.SQS_QUEUE_URL,
  };

  return sqs.sendMessage(params).promise();
};
