import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  closeIcon: {
    fontSize: "12px",
    color: "#949494",
    alignSelf: "flex-start"
  },
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

const CommentComponent = ({ comment, post, auth, deleteComment }) => {
  const classes = useStyles();
  return (
    <div className={classes.comment}>
      <div className={classes.commentMaterial}>
        <div className={classes.commentAuthor}>{comment.authorName}</div>
        <div className={classes.commentText}>{comment.commentText}</div>
      </div>
      <div>
        {auth.user._id === post.author._id ||
        auth.user._id === comment.author ? (
          <small className={classes.commentDltBtn}>
            <IconButton
              onClick={() => {
                deleteComment(post._id, comment._id);
              }}
            >
              <CloseIcon className={classes.closeIcon} />
            </IconButton>
          </small>
        ) : null}
      </div>
    </div>
  );
};

export default CommentComponent;
