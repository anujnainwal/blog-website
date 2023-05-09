const express = require("express");
const router = express.Router();
const userController = require("../controller/user/user.controller");

router.post("/register", userController.Register);
router.post("/login", userController.Login);

module.exports = router;
