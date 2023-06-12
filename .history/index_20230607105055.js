const express = require("express");
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.static("public"));
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// get all food
app.get("/food", async (req, res) => {
  const allfood = await prisma.food.findMany();
  res.send(allfood);
});

//get food id
app.get("/food/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = await prisma.food.findUnique({
    where: {
      food_id: id,
    },
  });
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
