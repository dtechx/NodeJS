// Single responsibility principle
const mongoose = require('mongoose');
const Joi = require('joi');

const {genreSchema} = require('./genre');


const Movie = mongoose.model('Movies', new mongoose.Schema({
    title: String,
    genre: {
        type: genreSchema
    },
    numberInStock: Number,
    dailyRentalRate: Number
}));

function validateMovie(movie) {
    const schema = Joi.object(
    {
        name: Joi.string().min(3).required()
    });

    return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;