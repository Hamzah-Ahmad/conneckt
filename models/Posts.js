const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  title: {
    type: String
  },
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
  ]
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
