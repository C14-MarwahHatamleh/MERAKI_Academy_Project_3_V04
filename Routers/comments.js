const express = require("express");

const authMiddlewares = require("../middlewares/authentication");
const authzMiddlewares = require("../middlewares/authorization");


const { createNewComment } = require("../contollers/comments");

const commentRouter = express.Router();

commentRouter.post("/:id", authMiddlewares,createNewComment);

module.exports = commentRouter;
/*



 * Testing Object:
{
  "comment":"Nice"
}
*/
