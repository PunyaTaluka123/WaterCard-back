// src/controllers/groupController.js

const Group = require('../models/Group');
const User = require('../models/User');

// Create a new group
exports.createGroup = async (req, res) => {
  const { groupName } = req.body;
  const userId = req.user.id;

  try {
    // Check if the group name is already taken
    let group = await Group.findOne({ groupName });
    if (group) {
      return res.status(400).json({ msg: 'Group name already exists' });
    }

    // Create a new group
    group = new Group({
      groupName,
      createdBy: userId,
      members: [{ user: userId }],
    });

    await group.save();

    res.json({ msg: 'Group created successfully', group });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.joinGroup = async (req, res) => {
    const { groupId } = req.params;
    const userId = req.user.id;
  
    try {
      const group = await Group.findById(groupId);
  
      if (!group) {
        return res.status(404).json({ msg: 'Group not found' });
      }
  
      // Check if user is already a member of the group
      if (group.members.includes(userId)) {
        return res.status(400).json({ msg: 'User already a member of this group' });
      }
  
      // Add user to the group
      group.members.push(userId);
      await group.save();
  
      // Optionally, add group reference to the user (if you store that)
      const user = await User.findById(userId);
      user.groups = user.groups || [];
      user.groups.push(groupId);
      await user.save();
  
      res.json({ msg: 'User successfully added to the group', group });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
// @route    GET api/groups/leaderboard/:groupId
// @desc     Get the leaderboard for a group
// @access   Private
exports.getGroupLeaderboard = async (req, res) => {
    try {
      const { groupId } = req.params;
  
      // Find the group by ID
      const group = await Group.findById(groupId);
  
      if (!group) {
        return res.status(404).json({ msg: 'Group not found' });
      }
  
      // Fetch users in the group based on the members array
      const users = await User.find({ _id: { $in: group.members } }).sort({ points: -1 });
  
      if (users.length === 0) {
        return res.status(404).json({ msg: 'No users found in this group' });
      }
  
      res.json({
        groupName: group.groupName,
        leaderboard: users.map(user => ({
          username: user.username,
          points: user.points,
        })),
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };