var express = require('express');
var router = express.Router();

var Resource = require('../models/resource.model');
var resourceController = require('../controllers/resource.controller');

router.get('/', resourceController.index)
router.post('/new', resourceController.new)
router.patch('/:id', resourceController.update)
router.delete('/:id', resourceController.destroy)

module.exports = router;
