const express = require('express');
const commentsController = require('../controllers/commentsController');

const router = express.Router();

router.get("/comments/:commentId", commentsController.getComment);

module.exports = router;