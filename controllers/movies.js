'use strict';

var Movie = require('../models/movies');


module.exports = function (router) {

    var model = new Movie();

    router.get('/', function (req, res) {
        Movie.find({}, function(err, movies) {
            if(err) {
                res.send(err);
            } else {
                var model = {
                    movies: movies
                }

                res.render('movies', model);
            }
        });

    });

    router.get('/add', function(req,res) {
        res.render('addmovies');
    });

    router.get('/details/:id', function(req, res) {
        Movie.findOne({_id: req.params.id}, function(err, movie) {
            if (err) {
                res.send(err);
            } else {
                var model = {
                    movie: movie
                }
                res.render('details', model)
            }
        });
    });

    router.post('/add', function(req, res) {
        var title = req.body.title && req.body.title.trim();
        var release_date = req.body.release_date && req.body.release_date.trim();
        var genere = req.body.genere && req.body.genere.trim();
        var director = req.body.director && req.body.director.trim();
        var plot = req.body.plot && req.body.plot.trim();
        var trailer = req.body.trailer && req.body.trailer.trim();
        var cover = req.body.cover && req.body.cover.trim();

        if (title == '' || release_date == '') {
            req.flash('error', "Please fill out required(*) field");
            res.location('/movies/add');
            res.redirect('/movies/add');
        }

        var newMovie = new Movie({
            title: title,
            release_date: release_date,
            genre: genere,
            director: director,
            plot: plot,
            trailer: trailer,
            cover: cover
        });

        newMovie.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                req.flash('success', "movies Saved");
                res.location('/movies');
                res.redirect('/movies');
            }
        });
    });

};
