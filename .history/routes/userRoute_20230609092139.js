const express = require("express");

const router = express.Router();
const controller = require("../controller/userController");
router.get("/users", controller.getallUser);
router.post("/createuser", controller.createUser);
router.put("/edituser", controller.editUser);
router.get("/user/:id", controller.getuserID);

// router.delete("/deleteuser", controller.deleteUser);

module.exports = router;
