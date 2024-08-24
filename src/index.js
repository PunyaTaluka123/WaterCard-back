const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Use morgan to log requests to the console
app.use(morgan('combined'));

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/water-usage', require('./routes/waterUsage'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
