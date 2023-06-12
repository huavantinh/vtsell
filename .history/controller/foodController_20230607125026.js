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
  let data = await prisma.food.findMany({
    where: {
      type_id: typeid,
    },
  });
  res.send(data);
};

// get food by typeid food user enter
const foodtypename = async (req, res) => {
  //   let typename = req.params.name;
  const typeName = req.params.name;
  const typeId = parseInt(typeName);
  console.log(typeId);
  let data = await prisma.food.findMany({
    where: {
      food_type: {
        type_id: typeId,
      },
    },
  });
  res.send(data);
};

module.exports = { foodid, getfood, foodtypeid, foodtypename };
