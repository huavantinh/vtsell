const express = require("express");

const router = express.Router();
const controller = require("../controller/userController");
router.get("/users", controller.getallUser);
router.get("/createuser", controller.createUser);

module.exports = router;
