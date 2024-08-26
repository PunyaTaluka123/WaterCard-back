// src/routes/group.js

const express = require('express');
const { createGroup, joinGroup, getGroupLeaderboard } = require('../controllers/groupController');
const auth = require('../middleware/auth');
const router = express.Router();

// @route    POST api/groups/create
// @desc     Create a new group
// @access   Private
router.post('/create', auth, createGroup);

// @route    POST api/groups/join
// @desc     Join an existing group
// @access   Private
router.post('/join', auth, joinGroup);

// @route    GET api/groups/:groupName/leaderboard
// @desc     Get group leaderboard
// @access   Private
router.get('/leaderboard/:groupId', auth, getGroupLeaderboard);

module.exports = router;
