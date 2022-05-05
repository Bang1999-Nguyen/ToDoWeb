const express = require("express");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/User");
const verifytoken = require("../middleware/auth");
const Admin = require("../models/Admin");

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

router.get("/profile", verifytoken, async (req, res) => {
  try {
    const users = await User.find({ _id: req.userId });
    res.json({ success: true, user: users });
  } catch (error) {
    console.log(error);
    res.json(500).json({ success: false, message: "Internal Server Error" });
  }
});

// @route GET list API/users
// @access private
// get list users
router.get("/users", verifytoken, async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ success: true, posts: users });
  } catch (error) {
    console.log(error);
    res.json(500).json({ success: false, message: "Internal Server Error" });
  }
});
// Post users
// @route POST api/users
// @access private
//  form user gồm: username, lastname, firstname, birthday, status, phone, email, description, address

router.post("/users", verifytoken, async (req, res) => {
  const {
    username,
    lastname,
    firstname,
    birthday,
    status,
    phone,
    email,
    description,
    address,
  } = req.body;
  try {
    const newUser = new Admin({
      username,
      lastname,
      firstname,
      birthday,
      status,
      phone,
      email,
      description,
      address,
      user: req.userId,
    });

    await newUser.save();
    res.json({ success: true, message: "Posted successfully!", user: newUser });
  } catch (error) {
    console.log(error);
    res.json(500).json({ success: false, message: "Internal Server Error" });
  }
});
// route PUT api/users list
// @access private
router.put("/users/:id", verifytoken, async (req, res) => {
  const {
    username,
    lastname,
    firstname,
    birthday,
    status,
    phone,
    email,
    description,
    address,
  } = req.body;
  try {
    let updateUser = {
      username,
      lastname,
      firstname,
      birthday,
      status,
      phone,
      email,
      description,
      address,
      user: req.userId,
    };
    // check condition
    const userUpdateCondition = { _id: req.params.id, user: req.userId };
    updateUser = await Admin.findOneAndUpdate(
      userUpdateCondition,
      updateUser,
      // new true is return new result
      {
        new: true,
      }
    );

    if (!updateUser) {
      return res.status(401).json({
        success: false,
        message: "User not found or user not authorised.",
      });
    }
    res.json({
      success: true,
      message: "User is updated successfully!",
      user: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
module.exports = router;
