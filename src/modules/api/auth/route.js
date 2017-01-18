const express = require('express');
const router = express.Router();
const Ctrl = require('./controller');

// HOME
router.get('/', function(req, res) {
    res.statusCode = 200;
    res.json({
        "ok": "SERVIÇO FUNCIONANDO"
    });
});

router.post('/', Ctrl.login);

router.post('/logout', Ctrl.logout);

router.post('/verify', Ctrl.verify);

module.exports = router;