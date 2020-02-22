const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const Post = require("../../models/Posts");

//@route POST api/post/like/:postId
//@desc Making a comment on a post
//@access Private
router.post("/:postId", auth, async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ msg: "Post not found" });
  try {
    if (post.likes.includes(req.user._id)) {
      post.likes = post.likes.filter(like => like.toString() !== req.user._id);
    } else {
      post.likes.push(req.user._id);
    }
    post.save();
    res.json(post.likes);
  } catch (err) {
    res.send("Error at likes.js " + err);
  }
});

module.exports = router;
