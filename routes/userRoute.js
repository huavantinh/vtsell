const express = require("express");
const router = express.Router();
router.use(express.json());

const controller = require("../controller/userController");
router.get("/users", controller.getallUser);
router.post("/createuser", controller.createUser);
router.put("/edituser", controller.editUser);
router.get("/user/:id", controller.getuserID);
router.post("/login", controller.login);
// router.delete("/deletedup", controller.deleteUserdup);
router.get("/logout", controller.logoutuser);

// router.delete("/deleteuser", controller.deleteUser);

module.exports = router;
