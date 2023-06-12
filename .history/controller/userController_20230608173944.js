const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// const { parse } = require("dotenv");

const getallUser = async (req, res) => {
  let data = await prisma.users.findMany();
  res.send(data);
};
const createUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      email: "elsa@prisma.io",
      name: "Elsa Prisma",
    },
  });
};
// const users = await prisma.user.findMany({
//     where: {
//       email: {
//         endsWith: 'prisma.io',
//       },
//     },
//   })

module.exports = { getallUser };
