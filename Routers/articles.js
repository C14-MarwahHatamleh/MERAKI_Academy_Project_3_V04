const express = require("express");

const {createNewArticle , getAllArticles} = require("../contollers/articles")
const articleRouter = express.Router();


articleRouter.post("/" , createNewArticle)
articleRouter.get("/" , getAllArticles)


module.exports = articleRouter;









/*
 * Testing Objects:
 * Article: 
 {
    "title":"Hello World",
    "description":"This is for testing",
}
*/
