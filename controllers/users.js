const express = require("express");
const pool = require("../models/db");
const pg = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

const login = (req, res) => {
  //TODO: write your code here
};

module.exports = { register };
