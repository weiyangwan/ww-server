var express = require('express');
var router = express.Router();

var Notification = require('../models/notification.model');
var notificationController = require('../controllers/notification.controller');

// router.get('/', notificationController.index)
router.post('/new', notificationController.new)
// router.patch('/:id', notificationController.update)
// router.delete('/:id', notificationController.destroy)

module.exports = router;
