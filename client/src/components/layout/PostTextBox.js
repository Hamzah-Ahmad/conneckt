import React, { useState } from "react";
import { connect } from "react-redux";
import { makePost } from "../../actions/postActions";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles(theme => ({
  postTextBox: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  submitBtn: {
    paddingRight: theme.spacing(1),
    float: "right"
  }
}));

const PostTextBox = props => {
  const classes = useStyles();
  const [postText, setPostText] = useState("");

  return (
    <div>
      <TextField
        fullWidth
        multiline={true}
        className={classes.postTextBox}
        variant="outlined"
        id="newPostBox"
        placeholder="Share your thoughts"
        value={postText}
        onChange={e => setPostText(e.target.value)}
      ></TextField>
      <Button
        variant="contained"
        color="primary"
        className={classes.submitBtn}
        onClick={() => {
          props.makePost(postText);
          setPostText("");
        }}
      >
        Submit
      </Button>
      <div style={{ clear: "right" }}></div>
    </div>
  );
};

export default connect(null, { makePost })(PostTextBox);
