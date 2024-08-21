// src/routes/waterUsage.js
const express = require('express');
const { logWaterUsage, getWaterUsageHistory } = require('../controllers/waterUsageController');
const auth = require('../middleware/auth');
const router = express.Router();

// @route    POST api/water-usage/log
// @desc     Log daily water usage
// @access   Private
router.post('/log', auth, logWaterUsage);

// @route    GET api/water-usage/history
// @desc     Get user water usage history
// @access   Private
router.get('/history', auth, getWaterUsageHistory);

module.exports = router;
