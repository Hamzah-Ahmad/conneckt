import React, { useState } from "react";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/commentActions";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    fontSize: "12px",
    color: "#949494",
    alignSelf: "flex-start",
  },
  comment: {
    // borderRadius: "20px",
    // borderBottom: "1px solid grey",
    backgroundColor: "#f5f5f5",
    padding: theme.spacing(0.5),
    display: "flex",
    margin: "12px 0",
    padding: "10px",
  },
  commentAuthor: {
    fontSize: "12px",
  },
  commentDltBtn: {},
  commentMaterial: {
    flex: "2",
  },
  commentText: {
    fontSize: "15px",
  },
  content: {
    fontSize: 18,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 8,
  },
  nameImg: {
    display: "flex",
    // alignItems: "center",
  },
  post: {
    border: "1px solid grey",
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },

  title: {
    fontSize: 14,
  },
}));

const CommentComponent = ({ comment, post, auth, deleteComment }) => {
  const classes = useStyles();
  const [disableBtn, setDisableBtn] = useState(false);
  return (
    <div className={classes.comment}>
      <div className={classes.commentMaterial}>
        <div className={classes.nameImg}>
          <img src={comment.image} className={classes.image} />
          <div>
            <div className={classes.commentAuthor}>{comment.authorName}</div>

            <div className={classes.commentText}>{comment.commentText}</div>
          </div>
        </div>
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
