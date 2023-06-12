const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// const { parse } = require("dotenv");

const getallUser = async (req, res) => {
  let data = await prisma.users.findMany();

  console.log(data);

  res.send(data);
};

// const users = await prisma.user.findMany({
//     where: {
//       email: {
//         endsWith: 'prisma.io',
//       },
//     },
//   })

module.exports = { getallUser };
