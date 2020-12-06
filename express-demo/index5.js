const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet'); 
const Joi = require('joi');
const express = require('express');
const logger = require('./middleware/logger');
const authenticate = require('./middleware/authenticator');

const courses = require('./routes/courses');
const home = require('/routes/home');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // Default value is ./views

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);


// Configuration
console.log('Application name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));

// set app_password=1234
console.log('Mail Passowrd: ' + config.get('mail.password'));


if(app.get('env') === 'development')
{
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}

app.use(logger);
app.use(authenticate);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

