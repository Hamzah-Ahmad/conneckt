import React, { useState } from "react";
import { connect } from "react-redux";
import { makePost } from "../../actions/postActions";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import ImageIcon from "@material-ui/icons/Image";

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "none",
    wordSpacing: "5px",
    borderRadius: "10px",
  },
  newPost: {
    border: "1px solid #bfbfbf",
    backgroundColor: "#fff",

    borderRadius: 20,
    marginTop: 15,
    padding: 15,
  },
  postTextBox: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    backgroundColor: "#fff",
  },
  previewImg: {
    height: 150,
    width: 180,
    display: "block",
    paddingTop: 10,
  },
  submitBtn: {
    paddingRight: theme.spacing(1),
    float: "right",
  },
}));

const PostTextBox = (props) => {
  const classes = useStyles();
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState("");
  const [previewImg, setPreviewImg] = useState("");

  const uploadPostImage = async (e) => {
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append("upload_preset", "connekt");
    formData.append("file", files);
    const imgData = await axios.post(
      "https://api.cloudinary.com/v1_1/dbqbqfiyn/image/upload",
      formData
    );
    setPreviewImg(imgData.data.secure_url);
    setImage(imgData.data.secure_url);
  };
  return (
    <div className={classes.newPost}>
      <TextField
        fullWidth
        multiline={true}
        className={classes.postTextBox}
        variant="outlined"
        id="newPostBox"
        placeholder="Share your thoughts"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
      ></TextField>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="raised-button-file-post"
        multiple
        type="file"
        onChange={uploadPostImage}
      />
      <label htmlFor="raised-button-file-post">
        <Button
          color="default"
          variant="outlined"
          component="span"
          className={classes.button}
        >
          Photo <ImageIcon style={{ paddingLeft: "10px" }} />
        </Button>
      </label>
      {previewImg ? (
        <img
          src={previewImg}
          alt="Preview Image"
          className={classes.previewImg}
        />
      ) : null}

      <Button
        variant="contained"
        color="primary"
        className={classes.submitBtn}
        onClick={() => {
          props.makePost(postText, image);
          setPostText("");
          setPreviewImg("");
        }}
      >
        Post
      </Button>
      <div style={{ clear: "right" }}></div>
    </div>
  );
};

export default connect(null, { makePost })(PostTextBox);
