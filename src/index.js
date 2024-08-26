const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Use CORS
app.use(cors()); // Enable CORS for all origins

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/water-usage', require('./routes/waterUsage'));
app.use('/api/groups', require('./routes/group')); // Add this line to include group routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
