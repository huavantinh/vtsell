const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { type } = require("express/lib/response");
const prisma = new PrismaClient();
// const { parse } = require("dotenv");
//get all user
const getallUser = async (req, res) => {
  let data = await prisma.users.findMany();
  res.send(data);
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
// Loi: khi nhap sai id thi khong bao id wrong
const getuserID = async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    if (id) {
      let data = await prisma.users.findMany({
        where: { id: id },
      });
      return res.send(data);
    }
    return res.send("Don't have this id");
  } catch (error) {
    res.send("error BE: ");
  }
};
//create user
const createUser = async (req, res) => {
  try {
    let { username, password, email } = req.body;
    let olduser = await prisma.users.findFirst({
      where: {
        email,
      },
    });
    if (olduser) {
      return res.send("User created");
    } else {
      // let passchange = pars
      console.log(typeof password);

      const passok = await bcrypt.hash(password, 10);
      console.log(passok);
      const datauser = await prisma.users.create({
        data: {
          username,
          password: passok,
          email,
        },
      });
      return res.send(datauser);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error BE");
  }
};

//login user
const login = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let checkuser = await prisma.users.findFirst({ where: { email } });
    if (checkuser) {
      let checkpass = await bcrypt.compareSync(password, checkuser.password);

      if (checkpass) {
        console.log(checkpass);
        return res.status(200).send(checkuser);
      }
      return res.send("wrong password");
    }
    return res.send("email wrong");
  } catch (error) {
    res.send("error BE: ");
  }
};

const deleteUserdup = async (req, res) => {
  let email = req.body.email;
  // var firstuser = await prisma.users.findFirst({ where: { email } });
  let otheruser = await prisma.users.findMany({ where: { email } });
  let oneuser = otheruser.firstuser;
  console.log(oneuser);
  let { firstuser } = otheruser;

  console.log(typeof firstuser);
  console.log(typeof otheruser);
  // console.log(firstuser);
  // console.log(otheruser);

  const deleteUsers = await prisma.users.deleteMany({
    where: {
      email: {
        contains: "prisma.io",
      },
    },
  });
};

module.exports = {
  getallUser,
  createUser,
  editUser,
  getuserID,
  login,
  deleteUserdup,
};
