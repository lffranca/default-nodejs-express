const express = require('express');
const router = express.Router();
const Ctrl = require('./controller');

// HOME
router.get('/', function(req, res) {
    res.statusCode = 200;
    res.render('index', {
        title: "HOME CONX"
    });
});

module.exports = router;