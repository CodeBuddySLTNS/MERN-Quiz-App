const mongoose = require('mongoose');
const router = require('express').Router();
const playerModel = require('../models/player');

const levelUp = (points, currentPoints) => {
  switch (true) {
    case (points < 200):
      return 1;
      break;
    case points < 425:
      return 2;
      break;
    case points < 650:
      return 3;
      break;
    case points < 850:
      return 4;
      break;
    case points < 1075:
      return 5;
      break;
    case points < 1300:
      return 6;
      break;
    case points < 1525:
      return 7;
      break;
    case points < 1750:
      return 8;
      break; 
    case points < 1975:
      return 9;
      break;
    case points < 2200:
      return 10;
      break;
    case points < 2425:
      return 11;
      break;
    case points < 2650:
      return 12;
      break;
    
    default:
      return currentPoints;
  }
}

router.get('/fetchPlayerData', async (req, res) => {
  try {
    const allPlayers = await playerModel.find({});
    
    if(!mongoose.Types.ObjectId.isValid(req.query.player)){
      return res.json({response: "not found"});
    }
    
    const found = await playerModel.findOne({_id: req.query.player});
    
    if(found){
      return res.json({response: found})
    }
    
    return res.json({response: "not found"})
    
  } catch (e) {console.log("An error occured:", e)}
})

router.get('/createNewPlayer', async (req, res) => {
  try {
    const allPlayers = await playerModel.find({});
    
    const found = await playerModel.findOne({name: req.query.player});
    
    if(found){
      return res.json({response: "unavailable"})
    }
    
    console.log("Player not found, creating new player...")
    
    const player = {
      playerId: allPlayers.length + 1,
      name: req.query.player,
      level: 1,
      points: 0,
      accuracy: 0,
      quizzes: 0
    }
    
    if(req.query.player){
      const newPlayer = await playerModel.create(player);
      console.log('New player....', newPlayer)
      return res.json({response: newPlayer});
    }
    
    res.json({response: "unavailable"});
  } catch (e) {console.log("An error occured:", e)}
})

router.get('/updatePlayerData', async (req, res) => {
  
  console.log(req.query.accuracy)
  try {
    if(!req.query.player || !req.query.points || !req.query.accuracy){
      return res.json({response: "parameters should not be null"})
    }
    
    if (!mongoose.Types.ObjectId.isValid(req.query.player)) {
      return res.json({response: "not found"});
    }
    
    const filter = {
      _id: req.query.player
    }
    
    const points = Number(req.query.points);
    const accuracy = Number(req.query.accuracy);
    
    const found = await playerModel.findOne(filter);
    
    if(found){
      if(found.points != points && found.points < points){
        console.log("New points detected.")
        
        const newLevel = await levelUp(points, found.level);
        
        console.log('new level', newLevel)
        
        const update = {
          level: newLevel,
          points: points,
          accuracy: accuracy,
          quizzes: found.quizzes + 1
        }
        
        const updatePoints = await playerModel.findOneAndUpdate(filter, update, {new: true});
        
        console.log(updatePoints);
        
        return res.json({response: updatePoints});
      }
      
      console.log('found', found);
    }
    
    res.json({response: "not found"});
  } catch (e) {
    console.log("An error occured:", e)
  }
})

router.get("/leaderboardData", async (req, res) => {
  try {
    const allPlayers = await playerModel.find({}).sort({points: -1, accuracy: -1, matches: -1});
  
    console.log(`\n\nALLPLAYERS\n${allPlayers}\n`)
    res.json({response: allPlayers})
  } catch (e) {console.log(e)}
})

module.exports = router;