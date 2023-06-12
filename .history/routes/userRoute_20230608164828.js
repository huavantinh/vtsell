const express = require("express");

const router = express.Router();
const controller = require("../controller/userController");
router.get("/alluser", controller.getallUser);

module.exports = router;
