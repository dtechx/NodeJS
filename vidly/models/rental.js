// Single responsibility principle
const mongoose = require('mongoose');
const Joi = require('joi');


const Rental = mongoose.model('Rentals', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            isGold: {
                type: Boolean,
                default: true
            },
            phone: {
                type: String,
                required: true
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true
            },
            dailyRentalRate: {
                type: Number,
                required: true
            },
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        Default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 2
    }
}));

function validateRental(rental) {
    const schema = Joi.object(
        {
            customerId: Joi.objectId().required(),
            movieId: Joi.objectId().required()
        });

    return schema.validate(rental, schema);
}

exports.Movie = Movie;
exports.validate = validateRental;