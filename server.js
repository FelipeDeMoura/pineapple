// server.js
// BASE SETUP
// =========================================

// call the packages we need
var express    = require('express');
var app        = express();     // define our app using express
//var bodyParser = require('body-parser');
//var media      = require('./app/models/media');
//var mongoose   = require('mongoose');

app.set('views', './app/templates');
// set the view engine to ejs
app.set('view engine', 'ejs');

// configure app to use bodyParser()
// this will let us get the data from a POST
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// question on this process ?
var port = process.env.PORT || 8080;    // set our port

// ROUTES FOR OUR API
// =========================================
//var router = express.Router();    // get an instance of the express Router

// middleware to use for all requests
// router.use(function(req, res, next) {
//   // do logging
//   console.log('Something is happing.');
//   next();
// });

// test route (accessed at GET http://localhost:8080/api)
// router.get('/', function(req, res){
//   res.json({ message: 'hooray! welcome to our api!' });
// });

// REGISTER OUR ROUTES
// all of our routes will be prefixed with /api
//app.use('/api', router);

//setTimeout((function() {res.send(items)}), 2000);

// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});

// detail page
app.get('/detail', function(req, res) {
    // res.render('pages/detail', function(err, html) {
    //   console.log("loader...");
    //   //res.send(html);
    // });
    res.render('pages/detail');
});

// blank page
app.get('/blank', function(req, res) {
    res.render('pages/blank');
});

// player page
app.get('/trailer', function(req, res) {
    res.render('pages/player');
});

app.use(express.static('./app'));

// START THE SERVER
// =========================================
app.listen(port);
console.log('Magic happens on port ', port);
