var express = require('express');
var router = express.Router();


var User = require('../models/user.model');
var userController = require('../controllers/user.controller');

//user sign up
router.post('/new', userController.new);
router.post('/signin', userController.signin);

router.get('/:id', userController.show);

// router.route('/:id')
//       .get(userController.show)
//       .patch(userController.update)
//       .delete(userController.destroy);

module.exports = router;
