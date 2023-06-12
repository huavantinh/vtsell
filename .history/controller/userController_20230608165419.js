const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { parse } = require("dotenv");

const getallUser = async (req, res) => {
  const users = await prisma.user.findMany();
};

// const users = await prisma.user.findMany({
//     where: {
//       email: {
//         endsWith: 'prisma.io',
//       },
//     },
//   })

module.exports = { getallUser };
