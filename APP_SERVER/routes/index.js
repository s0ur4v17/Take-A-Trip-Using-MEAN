var express = require('express');
var router = express.Router();

var ctrlAbout = require('../controllers/about');
var ctrlMovies = require('../controllers/trips');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Take A Trip' });
});

router.get('/about', ctrlAbout.about);
router.get('/list', ctrlMovies.movieList);
router.get('/trips/:tripId', ctrlMovies.movieDetail);

router.get('/new', ctrlMovies.clickAddMovie);
router.post('/new', ctrlMovies.addMovie);

router.get('/update/:tripId', ctrlMovies.clickUpdateMovie);
router.post('/update/:tripId', ctrlMovies.updateMovie);

router.get('/delete/:tripId', ctrlMovies.deleteMovie);

module.exports = router;