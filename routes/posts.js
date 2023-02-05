const express = require('express');
const postsController = require('../controllers/postsController');


const router = express.Router();

router.get("/all-posts", postsController.getPosts);
router.post("/create", postsController.createPost);

module.exports = router;