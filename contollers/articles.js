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
const getArticlesByAuthor = async (req, res) => {
  const { author_id } = req.query;
  try {
    await pool
      .query(`SELECT * FROM articles WHERE author_id =$1 AND is_deleted= $2`, [
        author_id,
        0,
      ])
      .then((results) => {
        res.status(201).json({
          success: true,
          massage: `All articles for the author: ${author_id}`,
          roles: results.rows,
        });
      })
      .catch((err) => {
        res.status(404).json({
          success: false,
          massage: `The author:  ${author_id} has no articles`,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      massage: `Server Error`,
      err: error.message,
    });
  }
};

// This function returns article by its id
const getArticleById = async (req, res) => {
  const { id } = req.params;

  try {
    await pool
      .query(
        `SELECT users.firstname , users.id , articles.id , articles.title , articles.description , articles.author_id , articles.is_deleted FROM articles FULL OUTER JOIN  users ON 
        users.id = articles.author_id
        WHERE users.id = $1 AND articles.is_deleted= $2`,
        [id, 0]
      )
      .then((results) => {
        res.status(201).json({
          success: true,
          massage: `All articles for the author: ${id}`,
          roles: results.rows,
        });
      })
      .catch((err) => {
        res.status(404).json({
          success: false,
          massage: `The author:  ${author_id} has no articles`,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      massage: `Server Error`,
      err: error.message,
    });
  }
};

// This function updates article by its id
const updateArticleById = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;

  await pool
    .query(`UPDATE articles SET title = $1 , description = $2 WHERE id = $3`, [
      title,
      description,
      id,
    ])
    .then((results) => {
      res.status(201).json({
        success: true,
        massage: `Article with id: ${id} updated successfully`,
        article: results,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: `Server Error`,
        err: err.message,
      });
    });
};

// This function deletes a specific article by its id
const deleteArticleById = async (req, res) => {
   const { id } = req.params;
  await pool
    .query(`DELETE FROM articles WHERE id = $1 AND is_deleted = $2`, [
      id,
      1
    ])
    .then((results) => {
      res.status(201).json({
        success: true,
        massage: `Article with id: ${id} deleted successfully`,
        article: results,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: `Server Error`,
        err: err.message,
      });
    });
};

// This function deletes all the articles for a specific author
const deleteArticlesByAuthor = async(req, res) => {
 const { id } = req.params;
  await pool
    .query(`DELETE FROM articles WHERE author_id = $1 AND is_deleted = $2`, [
      id,
      1
    ])
    .then((results) => {
      res.status(201).json({
        success: true,
        massage: `Article with id: ${id} deleted successfully`,
        article: results,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: `Server Error`,
        err: err.message,
      });
    });


};

module.exports = {
  createNewArticle,
  getAllArticles,
  getArticlesByAuthor,
  getArticleById,
  updateArticleById,
  deleteArticleById,
  deleteArticlesByAuthor
};
