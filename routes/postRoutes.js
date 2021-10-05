const express = require("express");
const postController = require("../controllers/postControllers");
const router = express.Router();
const Posts = require("../models/posts");
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  Posts.find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/create", (req, res) => {
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

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  Posts.find({ id: id })
    .then((post) => {
      if (post[0]) {
        res.json(post[0]);
      } else {
        rest.status(404);
        res.json({ watch_out: `Posts not found with id: ${id}` });
      }
    })
    .catch((err) => {
      res.status(404);
      res.json({ watch_out: `Posts not found with id: ${id}`, error: err });
    });
});


module.exports = router;