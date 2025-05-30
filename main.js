require("dotenv").config();
const pool = require("./models/db");
const express = require("express");
const app = express();

app.use(express.json());


const roleRouter = require("./Routers/roles");
const userRouter = require("./Routers/users");
const articleRouter = require("./Routers/articles");
const commentRouter = require("./Routers/comments");

app.use("/roles", roleRouter)
app.use("/users", userRouter)
app.use("/articles" , articleRouter)
app.use("/comments" , commentRouter)

app.listen(5000, () => {
  console.log("Server Running");
});
