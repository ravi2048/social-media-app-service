const express = require('express');
const commentsController = require('../controllers/commentsController');

const router = express.Router();

router.get("/:postId", commentsController.getComments);
router.get("/count/:postId", commentsController.getCommentsCount);
router.post("/addComment/:postId", commentsController.addComment);

module.exports = router;