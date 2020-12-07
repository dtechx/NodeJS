// Simple validation
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'My course',
        author: 'Dush',
        tags: ['NodeJS', 'backend'],
        isPublished: true,
        price: 15
    });

    try {
        const result = await course.save()
        console.log(result);

        // This validate method provided by mongoose returns nothing
        // const isValid = await course.validate();
        // console.log(isValid);

        // This is the only way to access the fail inside try
        // await course.validate((err) => {
        //     console.log(err.message);
        // });

    }
    catch (ex) {
        console.log(ex.message);
    }
}
createCourse();