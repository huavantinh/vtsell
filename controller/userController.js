const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { type } = require("express/lib/response");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const cookieOptions = require("../midleware/authen");
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
      return res.send("User already exists");
    } else {
      // Tạo token
      const passok = await bcrypt.hash(password, 10);
      const datauser = await prisma.users.create({
        data: {
          username,
          password: passok,
          email,
          // usertoken: " ",
          age: 36,
        },
      });
      console.log(datauser);
      let userid = datauser.id;
      const token = await jwt.sign({ email, userid }, "secret key", {
        expiresIn: "1h",
      });
      console.log(token);
      //lưu token db
      await prisma.users.update({
        where: { id: userid },
        data: { usertoken: token },
      });
      // Lưu token vào cookie
      console.log(req.headers.authorization);
      res.cookie("myCookie", token, cookieOptions);

      return res.send(token);
    }
  } catch (error) {
    console.error(error);

    return res.status(500).send("Error BE");
  }
};

//login user
const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let checkuser = await prisma.users.findFirst({ where: { email } });
    if (checkuser) {
      let checkpass = await bcrypt.compareSync(password, checkuser.password);
      if (checkpass) {
        return res.send(token);
      }
      return res.send("wrong password");
    }
    return res.send("email wrong");
  } catch (error) {
    res.send(error.message);
  }
};

//logout
const logoutuser = async (req, res) => {
  res.send("api.logout");
};

//forgot password

module.exports = {
  getallUser,
  createUser,
  editUser,
  getuserID,
  login,
  logoutuser,
};
