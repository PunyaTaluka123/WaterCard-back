const express = require('express');
const cors = require('cors');

const app = express();

// Use CORS middleware
app.use(cors());

// OR

// Allow only specific origins
app.use(cors({
  origin: ['http://localhost:60588', 'https://watercard-back.onrender.com']
}));

// Your other middleware and routes go here

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
