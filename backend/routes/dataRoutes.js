const express = require('express');
const { generateData, getAllData } = require('../controllers/dataController');
const router = express.Router();

router.post('/generate', generateData);
router.get('/', getAllData);

module.exports = router;
