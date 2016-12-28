var express = require('express');
var router = express.Router();

var levelup = require('levelup');
var db = levelup('./db');

router.route('/')
    .get(function (req, res, next) {
        var array = [];
        db.createReadStream()
            .on('data', function (data) {
                array.push(JSON.parse(data.value));
            })
            .on('close', function () {
                res.set('Content-Type', 'application/json');
                res.send(array);
            });
    })
    .post(function (req, res, next) {
        putToDb(req, res);
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
        putToDb(req, res);
    })
    .delete(function (req, res, next) {
        db.del(req.params.id, function (err) {
            if (err) { // handle I/O or other error
            }
            res.end();
        });
    });

function putToDb(req, res) {
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
}

module.exports = router;
