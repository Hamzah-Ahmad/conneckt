require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
var cors = require("cors");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //do this to bypass self signed certificate error when sending emails
const app = express();
app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Error in connecting to DB: " + err));

app.use("/api/users", require("./routes/api/auth/users"));
app.use("/api/auth", require("./routes/api/auth/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/comments", require("./routes/api/comments"));
app.use("/api/post/like", require("./routes/api/likes"));

if (process.env.NODE_ENV === "production") {
  //Set Static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server running on port " + port));
