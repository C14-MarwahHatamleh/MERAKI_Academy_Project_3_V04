const express = require("express");

const authMiddlewares = require("../middlewares/authentication");
const authzMiddlewares = require("../middlewares/authorization");


const { createNewComment , getCommentsByArticle} = require("../contollers/comments");

const commentRouter = express.Router();

commentRouter.post("/:id", authMiddlewares,createNewComment);
commentRouter.get("/:id", authMiddlewares,getCommentsByArticle);

module.exports = commentRouter;
/*



 * Testing Object:
{
  "comment":"Nice"
}
*/
