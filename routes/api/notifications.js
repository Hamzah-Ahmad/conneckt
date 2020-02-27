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

module.exports = router;
