const mongoose = require("mongoose");
const NotificationSchema = new mongoose.Schema({
  from_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  text: {
    type: String,
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  },
  date: {
    type: Date,
    default: Date.now()
  }
});
const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = {
  Notification: Notification,
  NotificationSchema: NotificationSchema
};
