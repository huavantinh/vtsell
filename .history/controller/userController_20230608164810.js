const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { parse } = require("dotenv");

const getallUser = (req, res) => {
  res.send("Hello World!");
};
module.exports = { getallUser };
