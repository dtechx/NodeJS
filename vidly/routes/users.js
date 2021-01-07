const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const express = require('express');
const Joi = require('joi');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered');

    // user = new User({ 
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });

    // user = await user.save();
    
    // res.send(user); or

    // res.send({
    //     name: user.name,
    //     email: user.email
    // });

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    res.send(_.pick(user, ['name', 'email']));

});

module.exports = router;