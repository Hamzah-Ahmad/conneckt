const mongoose = require("mongoose");
const { CommentSchema } = require("../models/Comment");
const PostSchema = new mongoose.Schema({
  content: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  comments: [CommentSchema]
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
