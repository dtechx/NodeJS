const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];

// http://localhost:3000/
app.get('/', (req, res) => {
    res.send('Hello World');
});

// http://localhost:3000/api/courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// http://localhost:3000/api/courses/1
app.get('/api/courses/:id', (req, res) => {
    res.send(req.params.id);
});

// http://localhost:3000/api/courses2/1
app.get('/api/courses2/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found');
    res.send(course);
});

http://localhost:3000/api/posts/2021/1
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});

// http://localhost:3000/api/posts2/2021/1?sortBy=name
app.get('/api/posts2/:year/:months', (req, res) => {
    res.send(req.query);
});

// // http://localhost:3000/api/courses
// app.post('/api/courses', (req, res) => {
//     if (!req.body.name || req.body.name.length < 3) {
//         // 400 Bad Request
//         res.status(400).send('Name is required and should be minimum 3 characters.');
//         return;
//     }

//     const course =
//     {
//         id: courses.length + 1,
//         name: req.body.name
//     };
//     courses.push(course);
//     res.send(course);
// });

// http://localhost:3000/api/courses
app.post('/api/courses', (req, res) => {
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
app.put('/api/courses/:id', (req, res) => {
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
app.delete('/api/courses/:id', (req, res) => {
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



// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));


// app.post();
// app.put();
// app.delete();

