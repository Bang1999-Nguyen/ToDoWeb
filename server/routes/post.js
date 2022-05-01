const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const Post = require("../models/Post");

// @route POST api/posts
// @access Private

router.post("/", verifyToken, async (req, res) => {
  const { title, description, status, createDate } = req.body;

  //   Simple validation
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required!" });
  }
  try {
    const newPost = new Post({
      title,
      description,
      status,
      createDate,
      user: req.userId,
    });
    await newPost.save();
    res.json({ success: true, message: "Posted successfully!", post: newPost });
  } catch (error) {
    console.log(error);
    res.json(500).json({ success: false, message: "Internal Server Error" });
  }
});

// @route GET api/posts
// @access private
router.get("/", verifyToken, async (req, res) => {
  try {
    //   populate: get details of user
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts: posts });
  } catch (error) {
    console.log(error);
    res.json(500).json({ success: false, message: "Internal Server Error" });
  }
});
// @route PUT api/posts
// @access private
router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, status, createDate } = req.body;

  //   Simple validation
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required!" });
  }
  try {
    let updatePost = {
      title,
      description: description || "",
      status: status || true,
      createDate,
      user: req.userId,
    };
    // check condition
    const postUpdateCondition = { _id: req.params.id, user: req.userId };
    // new true: return post new after updating
    updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, {
      new: true,
    });
    // User not authorised to update post or post not found
    if (!updatePost) {
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });
    }

    res.json({
      success: true,
      message: "Post is updated successfully!",
      post: updatePost,
    });
  } catch (error) {
    console.log(error);
    res.json(500).json({ success: false, message: "Internal Server Error" });
  }
});

// @route GET api/posts
// @access private
router.get("/", verifyToken, async (req, res) => {
  try {
    //   populate: get details of user
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts: posts });
  } catch (error) {
    console.log(error);
    res.json(500).json({ success: false, message: "Internal Server Error" });
  }
});
// @route DELETE api/posts
// @access private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletePost = await Post.findOneAndDelete(postDeleteCondition);
    if (!deletePost) {
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });
    }
    res.json({
      success: true,
      message: "Deleted successfully!",
      posts: deletePost,
    });
  } catch (error) {
    console.log(error);
    res.json(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
