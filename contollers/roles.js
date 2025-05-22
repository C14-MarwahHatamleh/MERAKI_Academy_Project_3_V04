const express = require("express");
const pool = require("../models/db");
const pg = require("pg");

const createNewRole = async (req, res) => {
  const { role } = req.body;
  try {
    const query = `INSERT INTO roles (role) VALUES ($1)`;
    const result = await pool.query(query, [role]);
   
    res.status(201).json({
      success: true,
      massage: "Role created successfully",
      roles: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      massage: "Server error",
    });
  }
};

// This function creates new permission
const createNewPermission = (req, res) => {
  //TODO: write your code here
};

// This function creates new role permission
const createNewRolePermission = (req, res) => {
  //TODO: write your code here
};

module.exports = { createNewRole };
