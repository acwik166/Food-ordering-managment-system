const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Configure environmental variables
dotenv.config({ path: './config/config.env' });

const app = express();

// Connect database
connectDB();

app.use(express.json());
app.use(morgan('dev'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));