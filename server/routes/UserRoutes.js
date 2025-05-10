const express = require("express");
const { signup, googleAuth, login, users, changepassword} = require("../controllers/UserController");
const { userMiddleware } = require("../middleware/UserMiddleware");

const router = express.Router();
  
router.post("/signup", signup);
router.post("/google-auth", googleAuth);
router.post("/login", login);
router.get('/users', userMiddleware, users);
router.post('/changepassword', userMiddleware, changepassword);

module.exports = router;