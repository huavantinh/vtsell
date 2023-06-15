const express = require("express");
const router = express.Router();
router.use(express.json());

const controller = require("../controller/productController");
router.get("/categories", controller.allcategories);
router.get("/all", controller.allproducts);
router.get("/category/:category", controller.productofcategory);
router.get("/bestproducts", controller.bestProducts);
router.get("/probyprice", controller.proPricing);
router.get("/sortproductaz", controller.sortproductaz);
router.get("/sortproductza", controller.sortproductza);
router.get("/searchpro", controller.searchpro);

module.exports = router;
