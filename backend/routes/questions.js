const express = require("express");
const axios = require("axios");

const questions = express.Router();

questions.get('/fetchUrl', async (req, res) => {
  let response;
  const difficulty = req.query.difficulty;
  try {
    switch (difficulty) {
      case 'easy':
        return res.json({
          dev: 'CodeBuddy Solutions',
          url: process.env.API_EASY
        })
        break;
      case 'medium':
        return res.json({
          dev: 'CodeBuddy Solutions',
          url: process.env.API_MEDIUM
        })
        break;
      case 'hard':
        return res.json({
          dev: 'CodeBuddy Solutions',
          url: process.env.API_HARD
        })
        break;
      case 'random':
        return res.json({
          dev: 'CodeBuddy Solutions',
          url: process.env.API_RANDOM
        })
        break;
      
      default:
        return res.json({
          dev: 'CodeBuddy Solutions',
          url: process.env.API_EASY
        })
    }
  } catch (e) {console.log('Error boss:', e)}
})

module.exports = questions;