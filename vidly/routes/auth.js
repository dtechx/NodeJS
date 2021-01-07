const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/user');
const express = require('express');
const Joi = require('joi');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    // Second parameter is the private key and that should not be stored in the source code
    // Key can be stored on a environment variable
    // const token = jwt.sign({ _id: user._id }, 'ThisIsThejwtPrivateKeyString');

    const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));

    res.send(token);
});

function  validate(req) {

    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(50).required()
    });

    return schema.validate(req);
}

module.exports = router;