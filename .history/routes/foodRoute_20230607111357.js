//import
var express = require("express");
var router = express.Router();
const controller = require("../controller/foodController");

// get all food
router.get("/food", async (req, res) => {
  const allfood = await prisma.food.findMany();
  res.send(allfood);
});

//get food id
router.get("/food/:id", foodid);
