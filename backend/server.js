require('dotenv').config();
require('colors');
const express = require('express');
const http = require('http');
const connectDb = require('./config/dbConfig');
const dataRoutes = require('./routes/dataRoutes');
const nodeCronJob = require('./cron/nodeCronJob');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// List of allowed origins
const allowedOrigins = [
  'http://localhost:3000', // Local development
  'https://your-frontend-service.onrender.com' // Deployed frontend URL
];

// Enable CORS
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const message = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());

// Connect to MongoDB
connectDb();

// Set up API routes
app.use('/api/data', dataRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'An unexpected error occurred!',
  });
});

// Set up Socket.IO
const io = new Server(server, {
  cors: {
    origin: allowedOrigins, // Allow multiple origins
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start the cron job
nodeCronJob(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.cyan.bold);
});
