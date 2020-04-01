const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const User = require("../../models/User");

//@route POST api/notifications
//@desc Making a comment on a post
//@access Private
router.get("/", auth, async (req, res) => {
  User.findById(req.user._id).then(user => {
    if (!user) {
      res.status(401).json({ msg: "User not found" });
    } else {
      res.json(user.notifications);
    }
  });
  //   res.send("Reached");
});

//@route DELETE api/notifications/notifId
//@desc Deleting Notification
//@access Private
router.delete("/:notifId", auth, async (req, res) => {
  const notifId = req.params.notifId;
  console.log("reached delete");
  User.findById(req.user._id).then(async user => {
    if (!user) {
      res.status(401).json({ msg: "User not found" });
    } else {
      user.notifications = user.notifications.filter(
        notif => notif._id.toString() != notifId
      );
      await user.save();
      // console.log(user.notifications)
      res.json(user.notifications);
    }
  });
});

module.exports = router;
