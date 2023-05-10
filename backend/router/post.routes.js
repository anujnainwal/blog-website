const express = require("express");
const postController = require("../controller/post/post.controller");
const { isAuthenticated } = require("../middleware/jwt-verify");
const router = express.Router();

router.post("/createPost", isAuthenticated, postController.createPost);

module.exports = router;
