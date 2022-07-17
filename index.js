const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const port = 9000;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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