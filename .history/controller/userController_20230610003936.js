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
      password: "$2a$12$wqRt8qNpu.g0h8.7IcuZZebrCgNb1dFye9OI1.nSJjKXvWrwv7BNm",
      email: "hvt2@gmail.com",
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
  // let email = parseInt(req.body.email)
  let email = req.body.email;
  let password = req.body.password;
  console.log(password, email);
  let checkuser = await prisma.users.findFirst({ where: { email } });
  let checkpass = await bcrypt.compareSync(password, checkuser.password);
  // let checkpass = await prisma.users.find
  if (checkuser) {
    if (checkpass) {
      return res.status(200).send(checkuser);
    }
    return res.send("wrong password");
  }
  res.send("email wrong");
  // let result = bcrypt.compareSync(password, checkPass.password);
  // console.log("oke2", result);
  // if (!email) {
  //   if (result) {
  //     return res.send("password ok + handle data");
  //   }
  //   return res.send("password dont match");
  // }
  // res.send("Email don't right");
};

module.exports = { getallUser, createUser, editUser, getuserID, login };
