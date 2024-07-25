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

const whitelist = ['http://localhost:5173', 'https://bytequiz.onrender.com']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use((req, res, next) => {
  console.log(req.url)
  next();
})
app.use(cors(corsOptions));
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