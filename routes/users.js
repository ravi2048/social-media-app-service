const express = require('express');
const usersController = require('../controllers/usersController');


const router = express.Router();

router.get("/:userId", usersController.getUserInfo);

module.exports = router;