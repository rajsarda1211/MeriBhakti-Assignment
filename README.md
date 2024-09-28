# MeriBhakti - Assignment

MeriBhakti Assignment, a full-stack application built with Node.js for the backend and React.js for the frontend.

## Installation

### Prerequisites
Make sure you have **Node.js** and **npm** (Node Package Manager) installed on your machine. You can download it from [Node.js official website](https://nodejs.org/).

### Setup

Clone the repository and install the dependencies for both the frontend and backend.

```bash
git clone https://github.com/sardaraj1211/your-repository.git
cd your-repository

# Navigate to the backend
cd backend
npm install
npm run server

# Go back to root folder
cd ..

# Navigate to the frontend
cd ../frontend
npm install
npm start

# Create a .env file and add the following detail
MONGO_URI=mongodb://your_mongo_uri
AWS_REGION=your_aws_region
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
SQS_QUEUE_URL=your_sqs_queue_url

