const express = require('express');
const usersController = require('../controllers/usersController');


const router = express.Router();

router.get("/users/:userId", usersController.getUser);

module.exports = router;