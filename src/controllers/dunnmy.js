// src/controllers/waterUsageController.js

const User = require('../models/User');

// @route    POST api/water-usage/log
// @desc     Log daily water usage
// @access   Private
exports.logWaterUsage = async (req, res) => {
  const { litersUsed } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Calculate points based on water usage
    const waterSaved = user.dailyGoal - litersUsed;
    let pointsEarned = 0;

    if (waterSaved > 0) {
      pointsEarned = Math.floor(waterSaved * 10); // 10 points per liter saved
    } else {
      const excessWater = Math.abs(waterSaved);
      pointsEarned = -Math.floor(excessWater * 5); // 5 points deducted per excess liter
    }

    // Update user water usage
    const usageRecord = {
      date: new Date(),
      litersUsed,
      pointsEarned,
    };

    user.waterUsage.push(usageRecord);
    user.points += pointsEarned;
    user.totalWaterSaved += Math.max(0, waterSaved);

    await user.save();

    res.json({
      msg: 'Water usage logged successfully',
      pointsEarned,
      totalPoints: user.points,
      totalWaterSaved: user.totalWaterSaved,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.getWaterUsageHistory = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      if (!user.waterUsage) {
        return res.status(404).json({ msg: 'Water usage history not found' });
      }
  
      res.json({
        waterUsage: user.waterUsage,
        totalPoints: user.points,
        totalWaterSaved: user.totalWaterSaved,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };