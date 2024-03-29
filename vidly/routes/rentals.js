// Single responsibility principle
const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const mongoose = require('mongoose');
const Fawn = require('fawn');

const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut'); // Descending order
    res.send(rentals);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer.');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie.');

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in Stock.');

    let rental = new Rental({
        customer: { // Selece necessary properties from the customer object
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: { // Selece necessary properties from the customer object
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: customer.dailyRentalRate
        }
    });

    try {
        new Fawn.Task()
            .save('rentals', rental) // Actual name of the collection in mongodb
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            })
            .run();
        //.remove()
        res.send(rental);
    }
    catch (ex) {
        res.status(500).send('Something failed.');
    }

    // Below three lines can be replaced by Fawn

    // // Following line might occur an error
    // // If it is so the movie.save() will not execute
    // // This kind of situations we need transactions 
    // // which ensures the both of the operations are done atomic level
    // rental = await rental.save();

    // movie.numberInStock--;
    // movie.save();


});

module.exports = router;