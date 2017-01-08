var express = require('express');
var router = express.Router();

var Following = require('../models/following.model');
var followingController = require('../controllers/following.controller');

router.get('/', followingController.index)
router.post('/new', followingController.new)
// router.patch('/:id', followingController.update)
// router.delete('/:id', followingController.destroy)

module.exports = router;
