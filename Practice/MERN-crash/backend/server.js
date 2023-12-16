const express = require('express');
const dotenv = require('dotenv');
dotenv.config('./.env');
const { errorHandler } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5001;
const app = express();
const connectDB = require('./config/db');

connectDB();

// Parses json data in request body
app.use(express.json());
// Parses URL Encoded data in request body
app.use(express.urlencoded({ extended: false }));


app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})