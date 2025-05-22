require("dotenv").config();
const pool = require("./models/db");
const express = require("express");
const app = express();

app.use(express.json());


app.listen(5000, () => {
  console.log("Server Running");
});
