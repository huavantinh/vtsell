const express = require("express");
const orderRouter = express.Router();
orderRouter.use(express.json());

const controller = require("../controller/orderController");
orderRouter.get("/myorders", controller.myorders);
orderRouter.get("/myproinanorder", controller.myproinanorder);
orderRouter.post("/newOrder", controller.newOrder);
orderRouter.delete("/removeorder", controller.removeOrder);
orderRouter.put("/updateorder", controller.updateOrder);

module.exports = orderRouter;
