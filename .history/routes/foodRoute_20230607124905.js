//import
var express = require("express");
var router = express.Router();
const controller = require("../controller/foodController");

// get all food
router.get("/food", controller.getfood);

//get food id
router.get("/food/:id", controller.foodid);

//get food by  type_id (typefood)
router.get("/foodtype/:typeid", controller.foodtypeid);

//get food by  type name (typefood)
router.get("/foodtype/:chay", controller.foodtypename);

module.exports = router;
