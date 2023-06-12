const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const getallUser = async (req, res) => {
  res.send("Hello World!");
};
module.exports = getallUser;
