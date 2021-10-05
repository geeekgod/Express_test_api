const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const posts = require("./data/posts");
const Posts = require("./models/posts");
const cors = require("cors");
const bodyParser = require("body-parser");
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

app.get("/users/posts", (req, res) => {
  Posts.find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/posts/create", (req, res) => {
  console.log(req.body);
  console.log(req.headers);
  if (req.body) {
    const post = new Posts(req.body);
    post
      .save()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => res.json(err));
  } else {
    res.json({ error: "Please send valid data" });
  }
});

app.get("/users/posts/:id", (req, res) => {
  const id = req.params.id;
  let sendingPosts = posts.find((post) => post.id === parseInt(id));
  if (sendingPosts) {
    res.json(sendingPosts);
  } else {
    res.status(404);
    res.json({ error: `Post with id ${id} not found` });
  }
});
