const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// const { parse } = require("dotenv");

const getallUser = async (req, res) => {
  let data = await prisma.users.findMany();
  res.send(data);
};
const createUser = async (req, res) => {
  const data = await prisma.users.create({
    data: {
      username: "hvt",
      password: "31101997",
      email: "hvt@prisma.io",

      type: "local",
    },
  });
  res.send(data);
};
// const users = await prisma.user.findMany({
//     where: {
//       email: {
//         endsWith: 'prisma.io',
//       },
//     },
//   })

module.exports = { getallUser, createUser };
