import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  comment: {
    borderRadius: "20px",
    border: "1px solid grey",
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    background: "#fff",
    display: "flex"
  },
  commentAuthor: {
    fontSize: "12px"
  },
  commentDltBtn: {},
  commentMaterial: {
    flex: "2"
  },
  commentText: {
    fontSize: "14px"
  },
  content: {
    fontSize: 18
  },
  post: {
    border: "1px solid grey",
    padding: theme.spacing(2),
    margin: theme.spacing(2)
  },

  title: {
    fontSize: 14
  }
}));

const CommentComponent = ({ comment, post, auth }) => {
  const classes = useStyles();

  return (
    <div className={classes.comment} key={comment._id}>
      <div className={classes.commentMaterial}>
        <div className={classes.commentAuthor}>{comment.authorName}</div>
        <div className={classes.commentText}>{comment.commentText}</div>
      </div>
      <div>
        {auth.user._id == post.author._id || auth.user._id == comment.author ? (
          <small className={classes.commentDltBtn}>Remove</small>
        ) : null}
      </div>
    </div>
  );
};

export default CommentComponent;
