var express = require('express');
var exphbs  = require('express-handlebars');
 
var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
 
// http://localhost:3000/
app.get('/', function (req, res) {
    res.render('home');
});

// http://localhost:3000/nextpage
app.get('/nextpage', function (req, res) {
    res.render('anotherpage');
});
 
app.listen(3000);