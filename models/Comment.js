const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  authorName: String,
  image: String,
  commentText: {
    type: String,
    required: true,
  },

  date_posted: {
    type: Date,
    default: Date.now(),
  },
});
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = {
  Comment: Comment,
  CommentSchema: CommentSchema,
};
