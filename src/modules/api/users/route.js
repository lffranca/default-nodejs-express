const express = require('express');
const router = express.Router();
const Ctrl = require('./controller');

router.get('/', Ctrl.index);
router.get('/:id', Ctrl.byId);
router.post('/', Ctrl.create);
router.post('/search', Ctrl.search);
router.put('/', Ctrl.update);
router.delete('/', Ctrl.delete);

module.exports = router;