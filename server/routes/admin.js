const express = require("express");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const router = express.Router();

const Admin = require("../models/Admin");
const verifytoken = require("../middleware/auth");
const verifyToken = require("../../../TokenJWT/middleware/auth");

// @route GET list API/USER
// @accesss private
// get list users

router.get("/users", verifytoken, async (req, res) => {
  try {
    const users = await Admin.find({});
    res.json({ success: true, users: users });
  } catch (error) {
    res.json(500).json({ success: false, message: "Internal Server Error" });
  }
});

// route POST api/users
// @access Private
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
    res.json(500).json({ success: false, message: "Internal Server Error" });
  }
});

// route PUT api/users list
// @access private
router.put("/users/:id", verifyToken, async (req, res) => {
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
    //   check condition
    const userUpdateCondition = { _id: req.params.id, user: req.userId };
    updateUser = await Admin.findOneAndUpdate(userUpdateCondition, updateUser, {
      new: true,
    });
    console.log("updateUser", updateUser);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// @route DELETE api/users
// @access private
router.delete("/users/:id", verifyToken, async (req, res) => {
  try {
    const userDeleteCondition = { _id: req.params.id, user: req.userId };
    const deleteUser = await Admin.findOneAndDelete(userDeleteCondition);
    if (!deleteUser) {
      return res.status(401).json({
        success: false,
        message: "user not found or user not authorised",
      });
    }
    console.log(deleteUser);
    res.json({
      success: true,
      message: "Deleted successfully!",
      posts: deleteUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
module.exports = router;
