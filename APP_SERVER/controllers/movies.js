const request = require('request');

var apiOptions = {
    server: 'http://localhost:3000'
};

var _showError = function(req, res,  status) {

    var title, content;

    if (status === 404) {
        title = "404, page not found";
        content = "Oh dear. Looks like we can't find this page. Sorry.";
    } else if (status === 500) {
        title = "500, internal server error";
        content = "How embarrassing. There's a problem with our server.";
    } else {
        title = status + ", something's gone wrong";
        content = "Something, somewhere, has gone just a little bit wrong.";
    }

    res.status(status).render('generic-text', { title, content });

};

var renderMovieList = function(req, res, responseBody) {

    var message;

    if (!(responseBody instanceof Array)) {
        message = "API Lookup Error.";
        responseBody = [];
      } else {
        if (!responseBody.length) {
          message = "No Movies Found.";
        }
      }

    res.render('list-display', {
        title: 'List of Movies',
        movies: responseBody,
        message: message
    });
};

module.exports.movieList = function(req, res) {

    var requestOption, path;

    var path = '/api/movies';

    requestOption = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };

    request(requestOption, function(err, response, body) {
        renderMovieList(req, res, body);        
    });
};

var renderMovieDetail = function(req, res, movieDetail) {
    res.render('details', {
        title: movieDetail.name,
        pageHeader: {
            title: movieDetail.name
        },
        movie: movieDetail
    });
};

var getMovieInfo = function (req, res, callback) {

    var requestOption, path;

    var path = '/api/movies/' + req.params.movieId;

    requestOption = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };

    request(requestOption, function(err, response, movieDetail) {

        var data = movieDetail;

        if(response.statusCode === 200) {
            callback(req, res, movieDetail);
        } else {
            _showError(req, res, response.statusCode);
        }
     
    });  
};

module.exports.movieDetail = function(req, res) {
    getMovieInfo(req, res, function(req, res, responseData){
        renderMovieDetail(req, res, responseData);
    });
};

var renderMovieForm = function(req, res) {
    res.render('create', {
        title: 'Create Movie'
    });
};

module.exports.clickAddMovie = function(req, res) {
        renderMovieForm(req, res);
};

module.exports.addMovie = function(req, res) {

    const path = '/api/movies/';

    const postdata = {
        name: req.body.name,
        description: req.body.description,
        genre: req.body.genre,
        rating: parseInt(req.body.rating, 10),
        releaseYear: req.body.releaseYear,
        budget: parseInt(req.body.budget, 10),
        image: req.body.image,
        rent: parseInt(req.body.rent, 10),
        crew: [{
                actors: req.body.actors,
                director: req.body.director,
                producer: req.body.producer,
                cinematographer: req.body.cinematographer,
                composer: req.body.composer
            }]
        };

    const requestOptions = {
        url: apiOptions.server + path,
        method: 'POST',
        json: postdata
    };

    request(requestOptions, (err, response, body) => {
        if (response.statusCode === 201) {
            res.redirect('/list');
        } else
            _showError(req, res, response.statusCode);
        }
    );
};

var renderUpdatePage = function(req,res,responseBody) {
    res.render ('update',{
      title:"Update Movie",
      movie: responseBody
    });
};

module.exports.clickUpdateMovie = function(req, res) {
    const path = '/api/movies/' + req.params.movieId;
    const requestOptions = {
      url: apiOptions.server + path,
      method: 'GET',
      json: {}
    };
    request(
      requestOptions,
      (err, response, body) => {
        renderUpdatePage(req, res, body);
    });
};

module.exports.updateMovie = function(req,res){
    const path='/api/movies/' + req.params.movieId;
    const postdata = {
        name: req.body.name,
        description: req.body.description,
        genre: req.body.genre,
        rating: parseInt(req.body.rating, 10),
        releaseYear: req.body.releaseYear,
        budget: parseInt(req.body.budget, 10),
        image: req.body.image,
        rent: parseInt(req.body.rent, 10),
        crew: [{
            actors: req.body.actors,
            director: req.body.director,
            producer: req.body.producer,
            cinematographer: req.body.cinematographer,
            composer: req.body.composer
        }]
    };
    const requestOptions ={
      url: apiOptions.server+path,
      method:'PUT',
      json:postdata
    };
    request(
      requestOptions,
      (err,response,body) => {
        if(response.statusCode ===200)
        {
          res.redirect('/list');
        }
    });
};

module.exports.deleteMovie = function(req, res) {
    const path = '/api/movies/' + req.params.movieId;
    const requestOptions = {
        url : apiOptions.server + path,
        method : 'DELETE',
        json : {}
    };
    request(
        requestOptions,
        (err, response, body) => {
            if(response.statusCode === 204){
                res.redirect("/list");
        }
    });
};