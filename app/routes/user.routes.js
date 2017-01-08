var express = require('express');
var router = express.Router();


var User = require('../models/user.model');
var userController = require('../controllers/user.controller');

//user sign up
router.post('/new', userController.new);
router.post('/signin', userController.signin);
router.post('/social-login', userController.socialSignin);

router.get('/', userController.index)
router.get('/currentUser', userController.show)
router.delete('/currentUser', userController.destroy);

// router.get('/userItinerariesList', userController.userItinerariesList)

// router.get('/:id', userController.show);

// router.route('/:id')
//       .get(userController.show)
//       .patch(userController.update)
//       .delete(userController.destroy);

module.exports = router;
