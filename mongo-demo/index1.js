// Mongodb CRUD operations with mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/playground', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

// Classes, objects
// Human, John
const Course = mongoose.model('course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Sample Course',
        author: 'Mosh Sample',
        tags: ['react', 'frontend'],
        isPublished: false
    });

    const result = await course.save();
    console.log(result);
}
// createCourse();

async function updateCourseApproch1(id) {
    // Approach 1: Query first
    // findById()
    // Modify its properties
    // save()

    const course = await Course.findById(id);
    if (!course) return;
    
    course.isPublished = true;
    course.author = 'Another Author';

    // course.set({
    //    isPublished = true,
    //    author = 'Another Author' 
    // });

    const result = await course.save();
    console.log(result);
}
// updateCourseApproch1('5fca86fc0c9aff1fe86e0877');

// Update the document without retrieving
async function updateCourseApproch2(id) {
    // Approach 2: Update first
    // Update directly
    // Optionally: get the updated document
    
    const result = await Course.update({ _id: id }, {
        $set: {
            author: 'Mosh',
            isPublished: false
        } // Mongodb update operators search on browser
    });
    // const result = await Course.update({ isPublished: false }); // Update all the courses which are not updated
    console.log(result);
}
// updateCourseApproch2('5fca86fc0c9aff1fe86e0877');

// Get the document that updated
async function updateCourseApproch3(id) {
    // Function findByIdAndUpdate was not working and shows a DeprecationWarning
    // TO DO
    // Optionally: get the updated document
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Jack',
            isPublished: true
        } // Mongodb update operators search on browser
    });
    // const result = await Course.update({ isPublished: false }); // Update all the courses which are not updated
    console.log(course);
}
// updateCourseApproch3('5fca86fc0c9aff1fe86e0877');



async function getCourses() {
    const courses = await Course
        .find({ author: 'Mosh', isPublished: true})
        .limit(10)
        .sort({ name: -1 }) // Ascending order 1 Descending order -1
        .select({ name: 1, tags: 1}); // Select only name and tags
        // .count(); // Number of documents

    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    // or
    // and
    
    // Comparison and Logical query operators
    // const courses = await Course
    //     .find({ author: 'Mosh', isPublished: false})
        // .find({ price: 10 }) // Find price == 10
        // .find({ price: { $gt: 10 } }) // Price greater than 10
        // .find({ price: { $gt: 10, $lte: 20 } }) // Price greater than 10 and less than 20
        // .find({ price: { $in: [10, 15, 20] } }) // Price 10 15 20
        /*.find()
        .or([ { author: 'Mosh' }, { isPublished: true } ])
        .and( [ ] ) */
        

    // Regex
    // const courses = await Course
        // /pattern/ // syntax of a regular expression
        // .find({ author: /^Mosh/ }) // Starts with Mosh
        // .find({ author: /Hamedani$/ }) // Ends with Hamedani case sensitive
        // .find({ author: /Hamedani$/i }) // Ends with Hamedani case insensitive
        // .find({ author: /.*Mosh.*/}) // Contains Mosh // zero or more characters


    // Pagination
    // /api/courses?pageNumber=2&pageSize=10
    // const pageNumber = 2;
    // const pageSize = 10;

    // const courses = await Course
    // .find({ author: 'Mosh', isPublished: true})
    // .skip((pageNumber -1) * pageSize)
    // .limit(pageSize)
    // .sort({ name: 1 }) // Ascending order 1 Descending order -1
    // .select({ name: 1, tags: 1}); // Select only name and tags

    console.log(courses);
}
// getCourses();

async function removeCourse(id) {
    // Method 1
    // const result = await Course.deleteOne({ _id: id });
    // const result = await Course.deleteMany({ _id: id });
    // Course.deleteOne({ isPublished = dlase})
    // console.log(result);

    // Method 2 
    // // Function findByIdAndRemove was not working and shows a DeprecationWarning
    // TO DO
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}
removeCourse('5fcd19d2200e843348bbe57e');