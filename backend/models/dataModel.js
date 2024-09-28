const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  calculatedField: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Data', DataSchema);
