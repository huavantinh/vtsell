const express = require("express");
const orderRouter = express.Router();
orderRouter.use(express.json());

const controller = require("../controller/orderController");
orderRouter.get("/myorders", controller.myorders);

module.exports = orderRouter;
