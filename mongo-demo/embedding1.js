// Embedding Documents
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: authorSchema,
    required: true
  }
}));

async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  // Unset whole author
  const course = await Course.update({ _id: courseId }, {
    $unset: {
      'author': ''
    }
  });

  // // Unset name
  // const course = await Course.update({ _id: courseId }, {
  //   $unset: {
  //     'author.name': ''
  //   }
  // });

  // // Update the course without querying
  // const course = await Course.update({ _id: courseId }, {
  //   $set: {
  //     'author.name': 'John Smith'
  //   }
  // });

  // // Query and update the course
  // const course = await Course.findById(courseId);
  // course.author.name = 'Mosh Hamedani';
  // course.save();
}

// updateAuthor('5fdb9cf1ed298a4640553b91');

createCourse('Node Course', new Author({ name: 'Mosh' }));

// createCourse('Node Course', null);

