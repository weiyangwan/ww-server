var express = require('express');
var router = express.Router();

var EventItem = require('../models/event.model');
var eventController = require('../controllers/event.controller');

router.get('/', eventController.index)
router.post('/new/:id', eventController.new)
router.patch('/:id', eventController.update)
router.delete('/:id', eventController.destroy)

module.exports = router;
