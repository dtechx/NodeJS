// Built in validators and custom validators
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255
        // match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: {
        type: Array,
        validate: { // Custom validation
            validator: function(v) {
                return v && v.length > 0; // First condition would check whther the Array is null
            },
            message: 'A course should have at least one tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price:{ 
        type: Number,
        required: function() { return this.isPublished; },
        // Cannot replace with arrow function since this would be reffered to something else 
        // (calling fuction most probably) but not this course object we are dealiing with here
        min: 10,
        max: 200
    }
});

const Course = mongoose.model('course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'My course',
        category: 'web',
        author: 'Dush',
        // tags: ['angular', 'frontend'],
        // tags: [],
        tags: null,
        isPublished: true,
        price: 15
    });

    try {
        const result = await course.save()
        console.log(result);
    }
    catch (ex) {
        console.log(ex.message);
    }
}
createCourse();