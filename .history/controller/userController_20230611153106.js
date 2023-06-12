const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { type } = require("express/lib/response");
const jwt = require("jsonwebtoken");

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
      const token = jwt.sign({ username, email }, "your_secret_key");
      console.log(token);
      const passok = await bcrypt.hash(password, 10);
      console.log(passok);
      const datauser = await prisma.users.create({
        data: {
          username,
          password: passok,
          email,
          token: token,
        },
      });
      console.log(datauser);
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

//forgot password
// const  resetPasswordRequest  = (parent, { email }, ctx, info) {
//   const user = await ctx.db.query.user({ where: { email } })
//   const token = jwt.sign({ userId: user.id}, process.env.APP_SECRET, { expiresIn: '1h'})

//   // Send email to user with url and token
//   console.log(token) // TODO: implement sending of email with url and token

//   return { email: user.email }
// },
// async resetPassword (parent, { token, password }, ctx, info) {
//   // Verify token and check if the user exist
//   const { userId } = jwt.verify(token, process.env.APP_SECRET)
//   const userExists = await ctx.db.exists.User({ id: userId })
//   if (!userExists) {
//     throw new Error(`User doesn't exist.`)
//   }

//   // If no error, set new password.
//   const newPassword = await bcrypt.hash(password, 10)
//   return ctx.db.mutation.updateUser({
//     where: { id: userId },
//     data: { password: newPassword }
//    })
// }
// }

//tim hieu viet delete user duplicate .
const deleteUserdup = async (req, res) => {
  res.send("chua viet, dang loi");
};
// const deleteUserdup = async (req, res) => {
//   let email = req.body.email;
//   // var firstuser = await prisma.users.findFirst({ where: { email } });
//   let userdup = await prisma.users.findMany({ where: { email } });
//   const firstUser = userdup[0];
//   userdup.splice(1);

//   const deleteUsers = await prisma.users.deleteMany({
//     where: {
//       email: {
//         contains: "prisma.io",
//       },
//     },
//   });
// };

// const deleteUserdup = async () => {
//   const users = await prisma.users.findMany();

//   const duplicateEmails = new Set();
//   const usersToDelete = [];

//   for (const user of users) {
//     if (duplicateEmails.has(user.email)) {
//       usersToDelete.push(user.id);
//     } else {
//       duplicateEmails.add(user.email);
//     }
//   }

//   // Lưu trữ ID của người dùng đầu tiên
//   const firstUserId = users[0].id;

//   if (usersToDelete.length > 0) {
//     await prisma.users.deleteMany({
//       where: {
//         id: {
//           in: usersToDelete,
//         },
//       },
//     });
//   }

//   return firstUserId;
// };

module.exports = {
  getallUser,
  createUser,
  editUser,
  getuserID,
  login,
  deleteUserdup,
};
