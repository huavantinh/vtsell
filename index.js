const express = require("express");
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.static("public"));
const cookieParser = require("cookie-parser");
app.use(cookieParser("secret"));
// app.use(cookieParser());
const router = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const orderRouter = require("./routes/orderRoute");

app.use("/api", router);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
