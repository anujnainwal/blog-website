const express = require("express");
const router = express.Router();
const userController = require("../controller/user/user.controller");
const { isAuthenticated } = require("../middleware/jwt-verify");

router.post("/register", userController.Register);
router.post("/login", userController.Login);
router.get("/list", isAuthenticated, userController.fetchAllUser);
router.put("/profile/:id", isAuthenticated, userController.updateProfile);
router.post("/follow", isAuthenticated, userController.userFollowing);
router.post("/unfollow", isAuthenticated, userController.userFollowing);
router.put("/changePassword", isAuthenticated, userController.changePassword);
router.delete("/:id", userController.deleteUser);
router.get("/:id", userController.singleUser);

module.exports = router;
