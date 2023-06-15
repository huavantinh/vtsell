const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const allcategories = async (req, res) => {
  let categories = await prisma.categories.findMany();
  res.send(categories);
};

const allproducts = async (req, res) => {
  let products = await prisma.products.findMany();
  res.send(products);
};

// show products in category
const productofcategory = async (req, res) => {
  let category = req.params.category;
  console.log(category);
  let infocat = await prisma.categories.findFirst({
    where: { title: category },
  });
  console.log(infocat);
  let productlist = await prisma.products.findMany({
    where: {
      cat_id: infocat.id,
    },
  });
  return res.send(productlist);
};

//find 5 products have best orders
const bestProducts = async (req, res) => {
  const bestpro = await prisma.orders_details.groupBy({
    by: ["product_id"],
    _sum: {
      quantity: true,
    },
    orderBy: {
      _sum: {
        quantity: "desc",
      },
    },
    take: 5,
  });

  console.log("ok");
  return res.send(bestpro);
};

//filter product by price [price1, price2]

const proPricing = async (req, res) => {
  let minprice = parseFloat(req.body.minprice);
  let maxprice = parseFloat(req.body.maxprice);
  let prodata = await prisma.products.findMany({
    where: {
      price: {
        gte: minprice, // Lớn hơn hoặc bằng 59.99
        lte: maxprice, // Nhỏ hơn hoặc bằng 250
      },
    },
  });
  return res.send(prodata);
  // res.send(prodata);
};

//find product by body input :
// ex: customer input: playstation . (filter title)
const searchpro = async (req, res) => {
  let keysearch = req.body.keysearch;
  console.log(typeof keysearch);
  let prodata = await prisma.products.findMany({
    where: {
      title: {
        contains: keysearch,
      },
    },
  });
  console.log(prodata);
  return res.send(prodata);
};
//sắp xep sp có gia từ thấp đền cao,
const sortproductaz = async (req, res) => {
  let prodata = await prisma.products.findMany();
  prodata.sort((a, b) => a.price - b.price);
  return res.send(prodata);
};
// cao đến thấp
const sortproductza = async (req, res) => {
  try {
    const prodata2 = await prisma.products.findMany();
    prodata2.sort((a, b) => b.price - a.price);
    return res.send(prodata2);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

//exprorts
module.exports = {
  allcategories,
  allproducts,
  productofcategory,
  bestProducts,
  proPricing,
  sortproductaz,
  sortproductza,
  searchpro,
};
