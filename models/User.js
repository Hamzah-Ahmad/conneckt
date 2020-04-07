const mongoose = require("mongoose");
const { NotificationSchema } = require("../models/Notification");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  notifications: [NotificationSchema],
  image: {
    type: "String",
    default:
      "https://res.cloudinary.com/dbqbqfiyn/image/upload/v1586219989/avatar-1577909_960_720_pwxyo0.webp",
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  register_date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
