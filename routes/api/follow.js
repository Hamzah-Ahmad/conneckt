const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const User = require("../../models/User");
const { Notification } = require("../../models/Notification");

//@route POST api/follow/:userId
//@desc Making a comment on a post
//@access Private
router.post("/:userId", auth, async (req, res) => {
  const userToFollow = await User.findById(req.params.userId);
  const currUser = await User.findById(req.user._id);
  if (!userToFollow) return res.status(404).json({ msg: "User not found" });
  //   const postAuthor = await User.findById(post.author);
  //   if (!postAuthor)
  //     return res.status(404).json({ msg: "Post Author not found" });
  try {
    if (userToFollow.followers.includes(req.user._id)) {
      console.log("Reached If");
      userToFollow.followers = userToFollow.followers.filter(
        follower => follower.toString() !== req.user._id
      );
      currUser.following = currUser.following.filter(
        following => following.toString() !== userToFollow._id.toString()
      );
      await userToFollow.save();
      currUser.save().then(currUser => {
        res.json(currUser.following);
      });
      // console.log(userToFollow.followers);
      // console.log("Reached if");
    } else {
      console.log("Reached else");
      userToFollow.followers.push(req.user._id);
      currUser.following.push(userToFollow._id);
      // console.log("Reached Else");

      const notif = await new Notification({
        user: req.user._id,
        text: `${req.user.name} followed you`
      });
      // console.log(postAuthor);
      userToFollow.notifications.push(notif);
      await userToFollow.save();
      currUser.save().then(currUser => {
        res.json(currUser.following);
      });
    }
  } catch (err) {
    res.send("Error at follow.js " + err);
  }
});

module.exports = router;
