const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const playerModel = require('./models/player');
const router = require('./routes/router');
const questions = require('./routes/questions');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4500;
const MONGO_URI = process.env.MONGO_URI;

app.use((req, res, next) => {
  console.log(req.url)
  next();
})
app.use(cors());
app.use('/api', router);
app.use('/api', questions);

app.get('/', (req, res) => res.json({response: 'http url'}))


mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected to DATABASE and SERVER running...");
    })
  })
  .catch((e) => {
    console.log(`FAILED: ${e}`)
  })