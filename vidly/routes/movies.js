// Single responsibility principle
const {Movie, validate} = require('../models/movie');
const {Genre} = require('../models/genre');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Find the genre by id in the req.body
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre.');

    const movie = new Movie({ // No need of let movie since id is created by mongoose
        name: req.body.title,
        genre: { // Select necessary properties from the genre object
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    await movie.save(); // Assigning again to the variable movie is not needed since the id created by the mongoose and const has been used in above
    res.send(movie);
});

router.put('/:id', async (req, res) => {
    
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    })

    if(!movie) return res.status(404).send('The movie with the given ID was not found');

    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);

    if(!movie) return res.status(404).send('The movie with the given ID was not found');

    res.send(movie);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.paramss.id);

    if (!movie) return res.status(404).send('The movie with the given ID was not found');

    res.send(movie);
});

module.exports = router;