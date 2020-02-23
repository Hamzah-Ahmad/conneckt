const express = require("express");
const router = express.Router();
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "952546",
  key: "fc9be82df2acb3b15348",
  secret: "6bb5c5f63b98ef71a3d0",
  cluster: "us2",
  encrypted: true
});

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
      pusher.trigger("connekt", "liked_post", {
        message: "hello world"
      });
    }
    post.save().then(post => {
      res.json(post.likes);
    });
  } catch (err) {
    res.send("Error at likes.js " + err);
  }
});

module.exports = router;
