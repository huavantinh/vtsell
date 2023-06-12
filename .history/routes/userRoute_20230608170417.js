const express = require("express");

const router = express.Router();
const controller = require("../controller/userController");
router.get("/users", controller.getallUser);

module.exports = router;
