const mongoose = require("mongoose");
const Post = require("../models/Posts");

const NotificationSchema = new mongoose.Schema({
  user: String,
  text: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = {
  Notification: Notification,
  NotificationSchema: NotificationSchema,
};
