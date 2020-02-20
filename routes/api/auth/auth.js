const crypto = require("crypto");

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../../../models/User");
const auth = require("../../../middleware/auth");

//@route POST api/auth
//@desc authenticating users
//@access Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  //Validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //Check for existing user
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    //Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    });
  });
});

//********FORGOT PASSWORD ROUTES START******** */
//@route POST api/auth/forgot
//@desc forgot password ppost route
//@access Public
router.post("/forgotPassword", (req, res) => {
  if (req.body === "") {
    res.status(400).send("email required");
  }
  //console.error(req.body);
  User.findOne({ email: req.body.email }).then(user => {
    if (user == null) {
      console.error("email not in database");
      res.status(403).send("email not in db");
    } else {
      const token = crypto.randomBytes(20).toString("hex");
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; //1 hour
      user.save();

      const transporter = nodemailer.createTransport({
        //make sure to adjust your gmail account's security to allow it to send emails
        service: "gmail",
        auth: {
          user: "sillypotato996@gmail.com", //put your email here
          pass: "Haz96./." //put your email's password here.
        }
      });

      //Use this as the link sent with the reset email in development
      //http://localhost:3000/reset/${token}\n\n
      //Use this as the link sent with the reset email in production
      //`https://${req.headers.host}/reset/${token}\n\n
      const mailOptions = {
        from: "sillypotato996@gmail.com", //put your email here
        to: `${user.email}`,
        subject: "Link To Reset Password",
        //IMP: replace localhost:3000 in the link below with ${req.headers.host} in production (or vice versa) to get the deployment site's header
        text:
          "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
          "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
          `http://localhost:3000/reset/${token}\n\n` +
          "If you did not request this, please ignore this email and your password will remain unchanged.\n"
      };

      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error("there was an error: ", err);
        } else {
          //console.log("here is the res: ", response);
          res.status(200).json("Recovery email sent");
        }
      });
    }
  });
});

router.get("/reset", (req, res, next) => {
  console.log(req.query.resetPasswordToken);
  User.findOne({
    resetPasswordToken: req.query.resetPasswordToken,
    resetPasswordExpires: { $gte: Date.now() }
  }).then(user => {
    if (user == null) {
      console.log("password reset link is invalid or has expired");
      res.status(403).send("password reset link is invalid or has expired");
    } else {
      res.status(200).send({
        email: user.email,
        message: "password reset link a-ok"
      });
    }
  });
});

router.put("/updatePasswordViaEmail", (req, res, next) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user != null) {
      console.log("user exists in db");
      bcrypt
        .hash(req.body.password, 12)
        .then(hashedPassword => {
          user.password = hashedPassword;
          user.resetPasswordExpires = null;
          user.resetPasswordToken = null;
          user.save();
        })
        .then(() => {
          console.log("password updated");
          res.status(200).send({ message: "password updated" });
        });
    } else {
      console.log("no user exists in db to update");
      res.status(404).json("no suer exists in db to update");
    }
  });
});
//********FORGOT PASSWORD ROUTES END******** */

//@route GET api/auth/user
//@desc get user data
//@access Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});
module.exports = router;
