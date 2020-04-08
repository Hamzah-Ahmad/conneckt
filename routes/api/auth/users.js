require("dotenv").config();
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../../models/User");

//@route POST api/users
//@desc registering users
//@access Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  //Validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //Check for existing user
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      name,
      email,
      password,
      followers: [],
      following: [],
      notifications: [],
    });

    //Create salt and hashed password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { _id: user.id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: 36000 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  _id: user.id,
                  name: user.name,
                  email: user.email,
                  followers: user.followers,
                  following: user.following,
                  notifications: user.notifications,
                  image: user.image,
                },
              });
            }
          );
        });
      });
    });
  });
});

// //TODO
// //helper funciton to get all users in postman. remove later
// router.get("/", (req, res) => {
//   User.find().then(users => res.json(users));
// });

module.exports = router;
