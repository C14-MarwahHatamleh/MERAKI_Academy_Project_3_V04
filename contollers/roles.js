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
  const { permission } = req.body;
  pool
    .query(`INSERT INTO permissions (permission) VALUES ($1)`, [permission])
    .then((results) => {
      res.status(201).json({
        success: true,
        massage: "Permission created successfully",
        roles: results,
      });
    })
    .catch((err) => {  res.status(500).json({
      success: false,
      massage: "Server error",
      err : err.massage
    });});
};

// This function creates new role permission
const createNewRolePermission = (req, res) => {
    const { role_id , permission_id } = req.body;
  pool
    .query(`INSERT INTO role_permission (role_id , permission_id) VALUES ($1 , $2)`, [role_id , permission_id])
    .then((results) => {
      res.status(201).json({
        success: true,
        massage: "Role Permission created successfully",
        roles: results,
      });
    })
    .catch((err) => {  res.status(500).json({
      success: false,
      massage: "Server error",
      err : err.massage
    });});
};

module.exports = {
  createNewRole,
  createNewPermission,
  createNewRolePermission,
};
