const config = require('config');
const Joi = require('Joi');
Joi.objectID = require('joi-objectid')(Joi);

const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();

if (!config.get('jwtPrivateKey')) {
    // Set environment variable through cmd
    // set vidly_jwtPrivateKey=mySecureKey
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost:27017/vidly', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useFindAndModify: false,
    // useCreateIndex: true
})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));