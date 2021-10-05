const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

// express init
const app = express();

// port
const port = process.env.PORT || 3000;

app.listen(port);

app.get("/", (req, res) => {
  res.json({
    name: "Hello",
  });
});

app.use(express.static("public"));
app.use(express.urlencoded());
app.use(morgan("dev"));
