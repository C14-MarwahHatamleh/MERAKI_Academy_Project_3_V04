const express = require("express");

const {createNewArticle , getAllArticles , getArticlesByAuthor} = require("../contollers/articles")
const articleRouter = express.Router();


articleRouter.post("/" , createNewArticle)
articleRouter.get("/" , getAllArticles)
articleRouter.get("/articles/search_1" , getArticlesByAuthor)


module.exports = articleRouter;









/*
 * Testing Objects:
 * Article: 
 {
    "title":"Hello World",
    "description":"This is for testing",
}
*/
