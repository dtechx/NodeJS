const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const morgan = require('morgan');
const express = require('express');
const app = express();

if(app.get('env') === 'development')
{
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

// DB work
dbDebugger('Connected to the database...');

/*
set DEBUG=app:startup
set DEBUG=
set DEBUG=app:db
set DEBUG=app:startup,app:db
set DEBUG=app:*
*/

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));