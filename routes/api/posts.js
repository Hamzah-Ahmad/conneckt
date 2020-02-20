const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Post = require("../../models/Posts");

//@route POST api/posts
//@desc Making Post
//@access Private
router.post("/", auth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id
    });
    res.json(newPost);
  } catch (err) {
    res.json(`Error occured at post's root POST route: ${err}`);
  }
});

//@route POST api/posts
//@desc Reading All Posts
//@access Public
router.get("/", async (req, res) => {
  try {
    await Post.find({})
      // .populate("author")
      .then(posts => res.json(posts));
  } catch (err) {
    res.send(`Error occured at post GET routes: ${err}`);
  }
});

//@route POST api/posts/postId
//@desc Deleting Post
//@access Private
//deleteOne/updateOne only delete/update a document while findOneAndDelete/Update return the updated/deleted document
router.delete("/:postId", auth, async (req, res) => {
  const postId = req.params.postId;
  const post = await Post.findOne({ _id: postId });
  // res.json(typeof post.author.toString());

  if (req.user.id == post.author.toString()) {
    try {
      await post.remove();
      res.json("Deleted Post");
    } catch (err) {
      res.send(err);
    }
  } else {
    return res.status(400).json({ msg: "You are not authorized to do that" });
  }
});

//@route POST api/posts/postId
//@desc Reading All Posts
//@access Private
router.patch("/:postId", auth, async (req, res) => {
  const postId = req.params.postId;
  const post = await Post.findOne({ _id: postId });
  if (req.user.id == post.author.toString()) {
    post.content = req.body.content;
    post.save().then(updatedPost => res.json(updatedPost));
  } else {
    res.status(401).json({ msg: "You are not authorized to do that" });
  }
});

module.exports = router;
