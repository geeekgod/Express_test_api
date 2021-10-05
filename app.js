const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const posts = require("./data/posts");
const app = express();

// port
const port = process.env.PORT || 3000;

app.listen(port);
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    name: "Hello",
  });
});

app.get("/users/posts", (req, res) => {
  let sendingPosts = posts;
  res.json(sendingPosts);
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
