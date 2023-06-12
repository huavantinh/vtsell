const express = require("express");
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.static("public"));
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.get("/", sync (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
          email: 'elsa@prisma.io',
        },
      })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(prisma.user);
});
