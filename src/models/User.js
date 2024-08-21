// src/models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  points: {
    type: Number,
    default: 0,
  },
  dailyGoal: {
    type: Number,
    default: 150,
  },
  totalWaterSaved: {
    type: Number,
    default: 0,
  },
  waterUsage: [
    {
      date: {
        type: Date,
        required: true,
      },
      litersUsed: {
        type: Number,
        required: true,
      },
      pointsEarned: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);
