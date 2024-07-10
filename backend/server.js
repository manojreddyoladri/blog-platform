require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const articleRoutes = require('./routes/articles');
const User = require('./models/User');
const Article = require('./models/Article'); // Import the model

const app = express();
const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.options('*', cors()); // Enable pre-flight for all routes

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
