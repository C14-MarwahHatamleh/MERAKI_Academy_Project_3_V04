const express = require("express");
const pool = require("../models/db");
const pg = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;
const TOKEN_EXP_Time = process.env.EXPIRESIN;

const register = async (req, res) => {
  const { firstName, lastName, age, country, email, password, role_id } =
    req.body;
  try {
    const query = `INSERT INTO users (firstName, lastName, age, country, email, password, role_id) VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7)`;
    await pool
      .query(query, [
        firstName,
        lastName,
        age,
        country,
        email,
        await bcrypt.hash(password, 10),
        role_id,
      ])
      .then((results) => {
        res.status(201).json({
          success: true,
          message: "Account created successfully",
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "The email already exists",
          err: err,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: error,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const query = `SELECT * from  users WHERE email = $1`;
    const result = await pool.query(query, [email]);
    if (result) {
      const dbHashPass = result.rows[0].password;
      console.log(dbHashPass);
      const isMatch = await bcrypt.compare(password, dbHashPass);
      console.log("isMatch", isMatch);
      if (!isMatch) {
        res.status(401).json({
          success: false,
          message:
            "The email doesn’t exist or the password you’ve entered is incorrect",
          data: null,
        });
      } else {
        const token = await generateTokens(result.rows[0]);

        res.status(200).json({
          success: true,
          message: "Valid login credentials",
          token: token,
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid login credentials",
      });
    }
    // console.log(result.rows);
    // const token = generateTokens(result.rows);
    // console.log(token);
    // .then((results) => {
    //    res.status(200).json({
    //   success: true,
    //    massage: "Valid login credentials",
    //   token: ,
    //   userId: ,
    //   });})
    // .catch((err) => {});
  } catch (error) {}
};

const generateTokens = async (user) => {
  let returnValue;
  if (user !== null) {
    const id = user.role_id;
   
    const query = `SELECT * FROM role_permission FULL OUTER JOIN permissions ON 
    role_permission.role_id = permissions.id
    WHERE role_permission.role_id = $1`
    
    // `SELECT * FROM role_permission FULL OUTER JOIN permission ON 
    // role_permission.id = permission.role_id
    // WHERE roles.id = $1`
    
    
    // `SELECT * from roles FULL OUTER JOIN role_permission ON 
    // roles.id = role_permission.role_id
    // where id = $1`;
    
    const result = await pool.query(query, [id]);
    console.log(result.rows[0]);
    const payload = {
      country: user.country,
      userID: user.id,
      role: {
        role: result.rows[0].role,
        permissions: result.rows[0].permission,
      },
    };
    const options = {
      expiresIn: TOKEN_EXP_Time,
    };
    returnValue = jwt.sign(payload, SECRET, options);
  } else {
    returnValue = "Sorry there is no any role for this email";
  }
  console.log(returnValue);
  return returnValue;
};

module.exports = { register, login };
