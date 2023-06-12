const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// const { parse } = require("dotenv");

const getallUser = async (req, res) => {
  let data = await prisma.users.findMany();
  res.send(data);
};

const getuserID = async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let data = await prisma.users.findMany({
      where: { id: id },
    });
    res.send(data);
  } catch (error) {
    res.send("error BE: " + error.message);
  }
};

const createUser = async (req, res) => {
  const datauser = await prisma.users.create({
    data: {
      username: "hvt",
      password: "31101997",
      email: "hvt@prisma.io",
      type: "local",
    },
  });
  res.send(datauser);
};

const editUser = async (req, res) => {
  const datauser = await prisma.users.update({
    where: {
      id: 22,
    },
    data: {
      username: "hvtvantinh",
      password: "31101997",
      email: "hvt@gmail.com",
      type: "local",
    },
  });

  res.send(datauser);
};

module.exports = { getallUser, createUser, editUser, getuserID };
