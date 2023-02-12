const express = require("express");
const relationshipController = require("../controllers/relationshipController");

const router = express.Router();

router.get("/", relationshipController.findRelation);
router.post("/", relationshipController.addFriend);
router.delete("/", relationshipController.deleteFriend);

module.exports = router;