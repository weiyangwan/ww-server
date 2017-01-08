var express = require('express');
var router = express.Router();

var Itinerary = require('../models/itinerary.model');
var itineraryController = require('../controllers/itinerary.controller');

router.get('/', itineraryController.index)
router.post('/new', itineraryController.new)
router.get('/:id', itineraryController.show)
router.patch('/:id', itineraryController.update)
router.get('/list/:id', itineraryController.list)
router.delete('/:id', itineraryController.destroy)

module.exports = router;
