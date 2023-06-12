const express = require("express");

const router = express.Router();
const controller = require("../controller/userController");
router.get("/user/alluser", controller.getallUser);

module.exports = router;
