// Async validators and validation errors
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
        enum: ['web', 'mobile', 'network'],
        lowercase: true // Change the input to lowercase
        // uppercase: true,
        // trim: true // Remove paddings
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function(v) {
                return v && v.length > 1;
            },
            message: 'A course should have at least one tag'
        }
    },
    // tags: {
    //     type: Array,
    //     validate: { // Async validation ex: result depends on database call
    //         isAsync: true, // This is deprecated and need to use Promises instead of isAsync option
    //         validator: function(v, callback) { // TO DO
    //             setTimeout(() => {
    //                 // Do some async work
    //                 const result = v && v.length > 0;
    //                 callback(result);
    //             }, 4000);
    //         },
    //         message: 'A course should have at least one tag'
    //     }
    // },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price:{ 
        type: Number,
        required: function() { return this.isPublished; },
        min: 10,
        max: 200
        // get: v => Math.round(v),
        // set: v => Math.round(v)
    }
});

const Course = mongoose.model('course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'My course',
        // category: '-',
        category: 'Mobile',
        author: 'Dush',
        tags: ['angular', 'frontend'],
        // tags: ['singletag'],
        // tags: [],
        // tags: null,
        isPublished: true,
        price: 15
    });

    try {
        const result = await course.save()
        console.log(result);
    }
    catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message);
        // console.log(ex.message);
    }
}
createCourse();