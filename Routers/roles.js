const express = require("express");

const roleRouter = express.Router();

const { createNewRole , createNewPermission  , createNewRolePermission } = require("../contollers/roles");

roleRouter.post("/", createNewRole);
roleRouter.post("/permission", createNewPermission);
roleRouter.post("/role_permission", createNewRolePermission);


module.exports = roleRouter;
