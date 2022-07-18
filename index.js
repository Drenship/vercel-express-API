const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();
const port = 9000;


mongoose
  .connect(
    process.env.MONGODB_URI,
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))



app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// middleware allow access to website api
app.use((req, res, next) => {
  if(!['localhost:8080', '127.0.0.1:8080', '192.168.1.16:8080', 'https://airbnb-mantis.vercel.app/'].includes(req.headers.host)) {
    const errorMessage = errorMessages('ACCESS_DENIED');
    res.status(401).send(errorMessage);
  }
  return next();
})



app.use(require('./lib/router/router'));

app.get("/", (req, res) => {
  res.status(201).json({ message: "Hello From Express App" });
});

/**
 * Error catch
 * gestion des erreurs par default
 */
app.use((err, req, res, next) => {
  console.log('Default Error catch call')
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`Starting Server on Port http://localhost:${port}`);
});

// # 1) Build API
// # 2) Deploy API
// # 3) 
// # 4) 