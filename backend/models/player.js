const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  playerId: {type: Number, required: true},
  name: {type: String, required: true},
  level: {type: Number, required: true},
  points: {type: Number, required: true},
  accuracy: {type: Number, required: true},
  quizzes: {type: Number, required: true}
},{timestamps: true});

const playerModel = mongoose.model("players", playerSchema);

module.exports = playerModel;