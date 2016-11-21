var express = require('express');
var router = express.Router();

var Itinerary = require('../models/itinerary.model');
var itineraryController = require('../controllers/itinerary.controller');

router.post('/new', itineraryController.new)
router.get('/:id', itineraryController.index)
router.patch('/:id', itineraryController.update)
// router.delete('/:id', itineraryController.destroy)

module.exports = router;
