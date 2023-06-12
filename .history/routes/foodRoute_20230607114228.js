//import
var express = require("express");
var router = express.Router();
const controller = require("../controller/foodController");

// get all food
router.get("/food", controller.getfood);

//get food id
router.get("/food/:id", controller.foodid);

//get food by  type_id (typefood)
router.get("/food/type_id", controller.foodtypeid);

module.exports = router;
