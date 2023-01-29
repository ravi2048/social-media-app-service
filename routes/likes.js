const express = require('express');
const likesController = require('../controllers/likesController');


const router = express.Router();

router.get("/likes/:likeId", likesController.getLike);

module.exports = router;