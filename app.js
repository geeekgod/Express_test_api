const express = require("express");
const morgan = require("morgan");
const posts = require("./data/posts");
const cors = require("cors");
const mongoose = require("mongoose");
const postRoutes = require("./routes/postRoutes");
const app = express();

// db
const dbURI =
  "mongodb+srv://rishabh_singh:Rekha12345678@cluster0.yx8a6.mongodb.net/Express-Test-Api?retryWrites=true&w=majority";

// port
const port = process.env.PORT || 3000;

mongoose
  .connect(dbURI)
  .then((res) => {
    // listen for requests

    app.listen(port);
    console.log("connected to db", res);
  })
  .catch((err) => {
    console.log(err);
  });

// middlewares
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    name: "Welcome to Express Test Api",
  });
});

app.use("/posts", postRoutes);
