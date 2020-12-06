const express = require('express');

const router = express.Router();

// http://localhost:3000/
router.get('/', (req, res) => {
    res.render('index', { title: 'My Express App', message: 'Hello' });
});

module.exports = router;