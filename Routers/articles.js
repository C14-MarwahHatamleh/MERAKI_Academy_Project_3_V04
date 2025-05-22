const express = require("express");

const {createNewArticle , getAllArticles , getArticlesByAuthor , getArticleById} = require("../contollers/articles")
const articleRouter = express.Router();


articleRouter.post("/" , createNewArticle)
articleRouter.get("/" , getAllArticles)
articleRouter.get("/search_1" , getArticlesByAuthor)
articleRouter.get("/search_2/:id" , getArticleById)

module.exports = articleRouter;









/*
 * Testing Objects:
 * Article: 
 {
    "title":"Hello World",
    "description":"This is for testing",
}
*/
