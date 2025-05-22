const express = require("express");
const pool = require("../models/db");
const pg = require("pg");

// This function creates a new comment for a specific article
const createNewComment = (req, res) => {
  const commenter_id = req.token.userID;
  const { comment } = req.body;
  const article_id = req.params.id;

  pool
    .query(
      `INSERT INTO comments (comment , article_id , commenter_id) VALUES ($1 , $2 , $3)`,
      [comment, article_id, commenter_id]
    )
    .then((results) => {
      res.status(201).json({
        success: true,
        massage: "Comment created successfully",
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
// This function returns the comments
const getCommentsByArticle = (req, res) => {};
module.exports = {
  createNewComment,
  getCommentsByArticle,
};
