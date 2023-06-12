const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//getallfood
const getfood = async (req, res) => {
  const allfood = await prisma.food.findMany();
  res.send(allfood);
};
//get food with id
const foodid = async (req, res) => {
  const id = parseInt(req.params.id);
  const data = await prisma.food.findUnique({
    where: {
      food_id: id,
    },
  });
  res.send(data);
};

// get food by typeid food
const foodtypeid = async (req, res) => {
  const typeid = parseInt(req.params.typeid);
  const data = await prisma.food.findUnique({
    where: {
      type_id: typeid,
    },
  });
};

module.exports = { foodid, getfood };
