const prisma = require("../index");

const getfood = async (req, res) => {
  const allfood = await prisma.food.findMany();
  res.send(allfood);
};
const foodid = async (req, res) => {
  const id = parseInt(req.params.id);
  const data = await prisma.food.findUnique({
    where: {
      food_id: id,
    },
  });
  res.send(data);
};

module.exports = { foodid, getfood, prisma };
