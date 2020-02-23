import React, { useState } from "react";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/commentActions";

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
    padding: theme.spacing(1),
    background: "#fff",
    display: "flex",
    width: "92.5%",
    margin: "16px auto"
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
  const [disableBtn, setDisableBtn] = useState(false);
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
                setDisableBtn(true);
                deleteComment(post._id, comment._id);
              }}
              disabled={disableBtn}
            >
              <CloseIcon className={classes.closeIcon} />
            </IconButton>
          </small>
        ) : null}
      </div>
    </div>
  );
};

export default connect(null, { deleteComment })(CommentComponent);
