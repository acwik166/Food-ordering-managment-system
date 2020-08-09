const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const restaurantRoutes = require('./routes/restaurantRoutes');
const userRoutes = require('./routes/userRoutes');

// Configure environmental variables
dotenv.config({ path: './config/config.env' });

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/restaurants', restaurantRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));