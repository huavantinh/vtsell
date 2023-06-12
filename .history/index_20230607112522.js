const express = require("express");
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.static("public"));
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = require("./routes/foodRoute");

app.use("/api", router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = prisma;
