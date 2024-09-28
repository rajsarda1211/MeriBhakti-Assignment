const Data = require('../models/dataModel');
const { sendMessageToSQS } = require('../services/sqsServices');

// Generate new data and handle errors
exports.generateData = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const existingData = await Data.findOne({ title });
    if (existingData) {
      return res.status(409).json({ message: 'A record with this title already exists. Please choose a different title.' });
    }

    const newData = await Data.create({ title, description });
    await sendMessageToSQS(newData._id); 
    res.status(201).json(newData);
  } catch (error) {
    next(error);  
  }
};


// Fetch all data with error handling
exports.getAllData = async (req, res, next) => {
  try {
    const data = await Data.find();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
