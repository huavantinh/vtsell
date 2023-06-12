const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

// const { parse } = require("dotenv");
//get all user
const getallUser = async (req, res) => {
  let data = await prisma.users.findMany();
  res.send(data);
};

//create user
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

//update user
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
// get user by id params
const getuserID = async (req, res) => {
  let id = parseInt(req.params.id);
  // try {
  if (!id) {
    let data = await prisma.users.findMany({
      where: { id: id },
    });
    res.send(data);
  }
  res.send("Don't have this id");
  // } catch (error) {
  //   res.send("error BE: " + error.message);
  // }
};

//login user
const login = async (req, res) => {
  let email = parseInt(req.body.email);
  let password = req.body.password;
  let checkMail = await prisma.users.findUnique({ where: { email } });
  console.log("oke mail =>>>>>>", checkMail);

  let checkPass = await prisma.users.findUnique({ where: { password } });
  console.log("oke 1 =>>>>>>", checkPass);
  console.log("oke 1 =>>>>>>", checkPass.password);

  let result = bcrypt.compareSync(password, checkPass.password);
  console.log("oke2", result);
  if (!email) {
    if (result) {
      return res.send("password ok + handle data");
    }
    return res.send("password dont match");
  }
  res.send("Email don't right");
};

module.exports = { getallUser, createUser, editUser, getuserID, login };
