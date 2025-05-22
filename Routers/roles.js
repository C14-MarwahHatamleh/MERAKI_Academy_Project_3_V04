const express = require("express");

const roleRouter = express.Router();

const { createNewRole } = require("../contollers/roles");

roleRouter.post("/", createNewRole);

module.exports = roleRouter;
