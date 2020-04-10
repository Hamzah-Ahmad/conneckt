const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const { Comment } = require("../../models/Comment");
const Post = require("../../models/Posts");
const { Notification } = require("../../models/Notification");
const User = require("../../models/User");
const ioServer = require("../../server");

//@route POST api/comments/postId
//@desc Making a comment on a post
//@access Private
router.post("/:postId", auth, async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(401).json({ msg: "Post not found" });
  const postAuthor = await User.findById(post.author);
  if (!postAuthor)
    return res.status(404).json({ msg: "Post Author not found" });
  const commentAuthor = await User.findById(req.user._id);
  if (!commentAuthor)
    return res.status(404).json({ msg: "Comment Author not found" });
  try {
    const newComment = await new Comment({
      author: commentAuthor._id.toString(),
      authorName: commentAuthor.name,
      image: commentAuthor.image,
      commentText: req.body.commentText,
      post: post._id,
    });
    post.comments.push(newComment);
    // console.log(commentAuthor._id);
    // console.log(req.user._id);
    // console.log(typeof commentAuthor._id);
    // console.log(typeof req.user._id);
    // console.log(commentAuthor);
    const notif = await new Notification({
      user: req.user._id,
      text: `${req.user.name} commented on your post`,
      post: post,
    });
    // console.log(postAuthor);
    postAuthor.notifications.push(notif);
    await postAuthor.save();
    ioServer.io.emit("generateNotif", notif);
    await post.save();

    res.json(post.comments);
  } catch (err) {
    res.send("Error at eomment.js " + err);
  }
});

//@route DELETE api/comments/postId/commentId
//@desc Making a comment on a post
//@access Private
router.delete("/:postId/:commentId", auth, async (req, res) => {
  Post.findById(req.params.postId).then((post) => {
    if (!post) return res.status(401).json({ msg: "Post not found" });
    const comment = post.comments.id(req.params.commentId);
    if (
      req.user._id === post.author.toString() ||
      req.user._id === comment.author.toString()
    ) {
      comment.remove();
      post.save((err, post) => {
        if (err) return res.json(err.response);
        else {
          return res.json(post.comments);
        }
      });
    } else {
      res
        .status(401)
        .json({ msg: "You are not authorized to perform this action" });
    }
  });
});

module.exports = router;
