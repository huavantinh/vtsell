const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//get
const myorders = async (req, res) => {
  try {
    let user_id = parseInt(req.body.user_id);
    let orders = await prisma.orders.findMany({
      where: { user_id },
    });
    console.log(orders);
    return res.send(orders);
  } catch (error) {
    console.log(error);
    return res.send("user don't have orders");
  }
};

//exprorts
module.exports = {
  myorders,
};
