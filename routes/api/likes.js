const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const Post = require("../../models/Posts");
const User = require("../../models/User");
const { Notification } = require("../../models/Notification");
const ioServer = require("../../server");

//@route POST api/post/like/:postId
//@desc Making a comment on a post
//@access Private
router.post("/:postId", auth, async (req, res) => {
  // socket.emit("likedPost", { hello: "world" });
  // console.log(ioServer.io.emit);
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ msg: "Post not found" });
  const postAuthor = await User.findById(post.author);
  if (!postAuthor)
    return res.status(404).json({ msg: "Post Author not found" });
  const currUser = await User.findById(req.user._id);
  if (!currUser) return res.status(404).json({ msg: "Current user not found" });
  try {
    if (post.likes.includes(req.user._id)) {
      post.likes = post.likes.filter(
        (like) => like.toString() !== req.user._id
      );
    } else {
      post.likes.push(req.user._id);
      const notif = await new Notification({
        user: req.user._id.toString(),
        text: `${req.user.name} liked your post`,
        post: post,
        userImg: currUser.image,
      });
      // console.log(postAuthor);
      postAuthor.notifications.push(notif);
      ioServer.io.emit("generateNotif", notif);
      //emit socket
      await postAuthor.save();
    }
    post.save().then((post) => {
      res.json(post.likes);
    });
  } catch (err) {
    res.send("Error at likes.js " + err);
  }
});

module.exports = router;
