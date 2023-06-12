const express = require("express");
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.static("public"));
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.get("/food", async (req, res) => {
  const allfood = await prisma.food.findMany();
  res.send(allfood);
});

// app.get("/food/:id", async (req, res) => {
//   const allfood = await prisma.food.findUnique({
//     where: {
//       food_id: ,
//     },
//   });
//   res.send(allfood);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
