const express = require("express");

const {
  createNewArticle,
  getAllArticles,
  getArticlesByAuthor,
  getArticleById,
  updateArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
} = require("../contollers/articles");
const authMiddlewares = require("../middlewares/authentication");
const authzMiddlewares = require("../middlewares/authorization");

const articleRouter = express.Router();

articleRouter.post("/", createNewArticle);
articleRouter.get("/", authMiddlewares, getAllArticles);
articleRouter.get("/search_1", getArticlesByAuthor);
articleRouter.get("/search_2/:id", getArticleById);
articleRouter.put("/:id", updateArticleById);
articleRouter.delete("/:id", deleteArticleById);
articleRouter.delete("/:id/author", deleteArticlesByAuthor);

module.exports = articleRouter;

/*
 * Testing Objects:
 * Article: 
 {
    "title":"Hello World",
    "description":"This is for testing",
}
*/
