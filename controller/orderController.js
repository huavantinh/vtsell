const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//get
const myorders = async (req, res) => {
  try {
    let user_id = parseInt(req.query.user_id);
    let orders = await prisma.orders_details.findMany({
      where: { orders: { user_id } },
    });
    console.log(orders);
    return res.send(orders);
  } catch (error) {
    console.log(error);
    return res.send("user don't have orders");
  }
};
//myproinanorder
// get products in an orders of users
const myproinanorder = async (req, res) => {
  try {
    //get id user
    let user_id = parseInt(req.body.user_id);
    const order = await prisma.orders.findMany({
      where: { user_id: user_id },
      include: {
        orders_details: {
          include: {
            products: true,
          },
        },
      },
    });
    return res.send(product);
  } catch (error) {
    return res.send("user don't have product");
  }
};

//create a new order ( create order => create order_details )
const newOrder = async (req, res) => {
  let user_id = req.body.user_id;
  let dataneworder = await prisma.orders.create({
    data: { user_id },
  });
  console.log(dataneworder);
  let products = req.body.products;
  let detailsArray = [];
  for (let i = 0; i < products.length; i++) {
    let product_id = req.body.products[i].product_id;
    let quantity = req.body.products[i].quantity;
    let details = await prisma.orders_details.create({
      data: { order_id: dataneworder.id, product_id, quantity },
    });
    detailsArray.push(details);
  }
  return res.send(detailsArray);
};

//update the order
//pass product_id and quantity to update order and order_details

const updateOrder = async (req, res) => {
  let order_id = parseInt(req.body.order_id);
  let product_id = parseInt(req.body.product_id);
  let quantity = req.body.quantity;

  console.log("update order", order_id, product_id, quantity);
  await prisma.orders_details.updateMany({
    where: { order_id: order_id },
    data: { product_id, quantity },
  });
  let orderUpdated = await prisma.orders_details.findMany({
    where: { order_id: order_id },
  });
  return res.send(orderUpdated);
};

//delete the order
const removeOrder = async (req, res) => {
  try {
    let order_id = req.body.order_id;
    await prisma.orders_details.deleteMany({
      where: { order_id },
    });
    await prisma.orders.deleteMany({
      where: { id: order_id },
    });
    console.log("Order deleted: " + order_id);
    return res.send("ok");
  } catch (error) {
    console.log(error);
    res.send("error BE");
  }
};
//total product in an order

// total order of user id

//exprorts
module.exports = {
  myorders,
  myproinanorder,
  newOrder,
  removeOrder,
  updateOrder,
};
