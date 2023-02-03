const express = require('express');
const postsController = require('../controllers/postsController');


const router = express.Router();

router.get("/all-posts", postsController.getPosts);

module.exports = router;