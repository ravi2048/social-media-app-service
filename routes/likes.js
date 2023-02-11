const express = require('express');
const likesController = require('../controllers/likesController');


const router = express.Router();

router.get("/:postId", likesController.getLikes);
router.post("/:postId", likesController.addLike);
router.delete("/:postId", likesController.deleteLike);

module.exports = router;