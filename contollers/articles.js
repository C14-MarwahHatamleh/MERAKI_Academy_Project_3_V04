const express = require("express");
const pool = require("../models/db");
const pg = require("pg");

// This function creates new article
const createNewArticle = async (req, res) => {
  const { title, description, author_id } = req.body;
  const query = `INSERT INTO articles (title , description , author_id) VALUES ($1 , $2 , $3)`;
  pool
    .query(query, [title, description, author_id])
    .then((results) => {
      res.status(201).json({
        success: true,
        massage: "Article created successfully",
        roles: results,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err.message,
      });
    });
};

// This function returns the articles
const getAllArticles = (req, res) => {
  pool
    .query(`SELECT * from articles`)
    .then((results) => {
      res.status(201).json({
        success: true,
        massage: "Get All Articles successfully",
        roles: results.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err.message,
      });
    });
};

//This function returns articles by author
const getArticlesByAuthor = (req, res) => {
  //TODO: write your code here
};

// This function returns article by its id
const getArticleById = (req, res) => {
  //TODO: write your code here
};

// This function updates article by its id
const updateArticleById = (req, res) => {
  //TODO: write your code here
};

// This function deletes a specific article by its id
const deleteArticleById = (req, res) => {
  //TODO: write your code here
};

// This function deletes all the articles for a specific author
const deleteArticlesByAuthor = (req, res) => {
  //TODO: write your code here
};

module.exports = { createNewArticle , getAllArticles};
