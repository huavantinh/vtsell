const express = require("express");

const router = express.Router();
const controller = require("../controller/userController");
console.log("daylecontolebasdhgasdjgajsd<M>>:", controller);
router.get("/alluser", controller.getallUser);

module.exports = router;
