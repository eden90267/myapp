var express = require('express');
var router = express.Router();

var levelup = require('levelup');
var db = levelup('./db');

router.route('/')
    .get(function (req, res, next) {
        res.send('get all products info');
    })
    .post(function (req, res, next) {
        var object = {
            name: req.body.name,
            type: req.body.type,
            price: req.body.price,
            date: new Date()
        };
        db.put(req.body.id, JSON.stringify(object), function (err) {
            if (err) return console.log('Ooops!', err) // some kind of I/O error
            res.json(object);
        });
    });

router.route('/:id')
    .get(function (req, res, next) {
        db.get(req.params.id, function (err, value) {
            if (err) return console.log('Ooops!', err) // likely the key was not found
            res.set('Content-Type', 'application/json');
            res.send(value);
        });
    })
    .put(function (req, res, next) {
        res.send('modify a product by ID');
    })
    .delete(function (req, res, next) {
        res.send('delete a product by ID');
    });

module.exports = router;
