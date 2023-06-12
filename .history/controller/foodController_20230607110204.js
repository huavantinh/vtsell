const foodid = async (req, res) => {
  const id = parseInt(req.params.id);
  const data = await prisma.food.findUnique({
    where: {
      food_id: id,
    },
  });
  res.send(data);
};

module.exports = { foodid };
