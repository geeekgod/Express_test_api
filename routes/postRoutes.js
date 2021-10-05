const express = require("express");
const postController = require("../controllers/postControllers");
const router = express.Router();
const Posts = require("../models/posts");

router.get("/", postController.posts_index);

router.post("/create", postController.post_create);

router.get("/:id", postController.post_show_single);

module.exports = router;
