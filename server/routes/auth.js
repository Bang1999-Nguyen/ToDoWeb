const express = require("express");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/User");

// @route POST api/auth
// Register user
// @access public
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  //   simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username or password." });

  try {
    //   check for existing user
    const user = await User.findOne({
      username,
    });
    if (user)
      return res.status(400).json({
        success: false,
        message: "Username already taken",
      });
    // All good
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      username,
      password: hashedPassword,
    });
    // save data into server
    await newUser.save();

    // accessToken
    const accessToken = jwt.sign({ userId: newUser._id }, "ACCESS_TOKEN");

    res.json({
      success: true,
      message: "User created successfully!",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.json(500).json({ success: false, message: "Internal Server Error" });
  }
});

// @route POST api/auth
// Log in user
// @access public
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  //   simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username or password." });
  try {
    //   check for existing user
    const user = await User.findOne({
      username,
    });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Incorrect username or password",
      });
    // username valid
    // user.password: password in database
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });
    }
    // All good
    // accessToken
    const accessToken = jwt.sign({ userId: user._id }, "ACCESS_TOKEN");

    res.json({
      success: true,
      message: "Logged in successfully!",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.json(500).json({ success: false, message: "Internal Server Error" });
  }
});
module.exports = router;
