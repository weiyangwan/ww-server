var express = require('express');
var router = express.Router();

var Post = require('../models/post.model');
var postController = require('../controllers/post.controller');

router.get('/', postController.index)
router.post('/new', postController.new)
router.patch('/:id', postController.update)
router.delete('/:id', postController.destroy)

module.exports = router;
