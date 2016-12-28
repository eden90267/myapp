var express = require('express');
var router = express.Router();

router.route('/')
    .get(function (req, res, next) {
        res.send('get all products info');
    })
    .post(function (req, res, next) {
        res.send('add a new product');
    });

router.route('/:id')
    .get(function (req, res, next) {
        res.send('get a product by ID');
    })
    .put(function (req, res, next) {
        res.send('modify a product by ID');
    })
    .delete(function (req, res, next) {
        res.send('delete a product by ID');
    });

module.exports = router;
