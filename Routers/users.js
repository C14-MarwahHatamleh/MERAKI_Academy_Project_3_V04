const express = require("express");

const { register } = require("../controllers/users");
const userRouter = express.Router();
// Import users controllers

userRouter.post("/register", register);

module.exports = userRouter;

/*
 * Testing Object:
{
  "firstName": "Sara",
  "lastName": "Ahmad",
  "age": 29,
  "country": "Jordan",
  "email":"sara.alahmad@gmai.com",
  "password": "123456",
  "role_id":"1"
}
*/
