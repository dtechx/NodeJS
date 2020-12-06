const express = require('express');

const router = express.Router();

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];

// http://localhost:3000/api/courses
router.get('/', (req, res) => {
    res.send(courses);
});

// http://localhost:3000/api/courses/1
router.get('/', (req, res) => {
    res.send(req.params.id);
});

// http://localhost:3000/api/courses2/1
router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found');
    res.send(course);
});

// http://localhost:3000/api/posts/2021/1
router.get('/:year/:month', (req, res) => {
    res.send(req.params);
});

// http://localhost:3000/api/courses
router.post('/', (req, res) => {
    const { error } = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const course =
    {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// http://localhost:3000/api/courses/1
router.put('/:id', (req, res) => {
    // Look up the course if not exist return 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found');

    // Validate if invalid return 400 Bad request
    const { error } = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    // Update course return the updated course to the client
    course.name = req.body.name;
    res.send(course);
});

// http://localhost:3000/api/courses/1
router.delete('/:id', (req, res) => {
    // Look up the course if not exist return 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found');

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});




// Validate function
function validateCourse(course) {
    // const schema = Joi.object(
    //     {
    //         name: Joi.string().min(3).required()
    //     });

    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);
}

module.exports = router;