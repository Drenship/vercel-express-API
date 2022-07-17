import express from "express";

const app = express();
const port = 9000;

app.use(require('./lib/router/router'));

app.use("/", (req, res) => {
  res.json({ message: "Hello From Express App" });
});

app.listen(9000, () => {
  console.log(`Starting Server on Port http://localhost:${port}`);
});