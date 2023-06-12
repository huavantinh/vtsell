const express = require("express");

const router = express.Router();
const controller = require("../controller/userController");
router.get("/users", controller.getallUser);
router.post("/createuser", controller.createUser);
router.put("/edituser", controller.editUser);

module.exports = router;
