import React, { useState } from "react";
import { connect } from "react-redux";
import { postComment as makeComment } from "../../actions/commentActions";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import CommentComponent from "./CommentComponent";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";
import Dialog from "@material-ui/core/Dialog";

const useStyles = makeStyles(theme => ({
  textField: {
    width: "95%",
    margin: "auto",
    marginTop: theme.spacing(1)
  }
}));
const CommentBoxComponent = props => {
  const classes = useStyles();
  const [commentText, setCommentText] = useState("");
  return (
    <Dialog
      onClose={() => props.setCommentOpen(false)}
      aria-labelledby="simple-dialog-title"
      open={props.commentDialogOpen}
      fullWidth
      className={classes.commentModal}
    >
      <TextField
        fullWidth
        multiline={true}
        variant="outlined"
        id="commentTextField"
        value={commentText}
        className={classes.textField}
        placeholder="Add a comment"
        onChange={e => setCommentText(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  if (commentText) {
                    props.makeComment(props.post._id, commentText);
                    setCommentText("");
                  }
                }}
              >
                <KeyboardArrowRightOutlinedIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <div>
        {props.post.comments.map(comment => (
          <CommentComponent
            comment={comment}
            post={props.post}
            auth={props.auth}
            key={comment._id}
            deleteComment={props.deleteComment}
          />
        ))}
      </div>
    </Dialog>
  );
};

export default connect(null, { makeComment })(CommentBoxComponent);
