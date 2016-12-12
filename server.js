/**
 * Created by triggsley on 12/12/2016.
 * tutorial : https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
 */

// server.js

// BASE SETUP
// =========================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Bear       = require('./app/models/bear');

// connect to mongodb string
mongoose.connect('mongodb://localhost:27017/node_api');




// configure to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ROUTES FOR API
// =========================================
var router = express.Router();

router.use(function (req, res, next) {
    // db logging
    console.log('Something is happening: middleware');
    next();
});


// test route to make sure everything is working
router.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to our api'});
});

// mpre routes to follow

// on routes that end in /bears
router.route('/bears')

// create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });

    })
    .get(function (req, res) {
        Bear.find(function (err, bears) {
            if(err)
                res.send(err);

            res.json(bears);
        });
    });

// all routes that end in /bears/:bear_id
router.route('/bears/:bear_id')

    .get(function (req, res) {
        console.log(req);
        Bear.findById(req.params.bear_id, function (err, bear) {
            if(err)
                res.send(err);

            res.json(bear);
        });
    })
    .put(function (req, res) {
        console.log(req.query);
        Bear.findById(req.params.bear_id,  function (err, bear) {

            if(err)
                res.send(err)

            bear.name = req.query.name;

            bear.save(function (err) {
                if(err)
                    res.send(err);

                res.json({message: 'Bear updated!'});
            });
        });
    })
    .delete(function (req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function (err, bear) {
            if(err)
                res.send(err);

            res.json({message: 'Successfully deleted'});

        });
    });

// REGISTER OUR ROUTES ------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =========================================
app.listen(port);
console.log('Magic happens on port ' + port);
