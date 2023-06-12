const { PrismaClient } = require("@prisma/client");
const { parse } = require("dotenv");
const prisma = new PrismaClient();

//getallfood
const getfood = async (req, res) => {
  const allfood = await prisma.food.findMany();
  res.send(allfood);
};
//get food with id
const foodid = async (req, res) => {
  let id = parseInt(req.params.id);
  let data = await prisma.food.findUnique({
    where: {
      food_id: id,
    },
  });
  res.send(data);
};

// get food by typeid food
const foodtypeid = async (req, res) => {
  let typeid = parseInt(req.params.typeid);
  console.log("nod laf", typeid);
  console.log(typeof typeid);
  let data = await prisma.food.findUnique({
    where: {
      type_id: typeid,
    },
  });
  res.send(data);
};

module.exports = { foodid, getfood, foodtypeid };
