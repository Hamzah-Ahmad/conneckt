import React, { useState } from "react";
import { postComment, deleteComment } from "../../actions/commentActions";
import { likePost } from "../../actions/likeActions";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import GradeOutlinedIcon from "@material-ui/icons/GradeOutlined";
import GradeIcon from "@material-ui/icons/Grade";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";

import CommentComponent from "./CommentComponent";

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

const PostComponent = props => {
  // React.useEffect(() => {
  //   console.log(props.post.likes.includes(props.auth.user._id));
  // });
  const classes = useStyles();
  const [commentText, setCommentText] = useState("");
  return (
    <div className={classes.post}>
      <div className={classes.title}>{props.post.author.name}</div>

      <div className={classes.content}>{props.post.content}</div>
      <IconButton
        onClick={() => {
          props.likePost(props.post._id);
        }}
      >
        {props.post.likes.includes(props.auth.user._id) ? (
          <GradeIcon color="primary" />
        ) : (
          <GradeOutlinedIcon />
        )}
      </IconButton>
      <small>{props.post.likes.length}</small>
      <TextField
        fullWidth
        multiline={true}
        variant="outlined"
        id="commentTextField"
        placeholder="Add a comment"
        onChange={e => setCommentText(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  if (commentText) {
                    props.postComment(props.post._id, commentText);
                    setCommentText("");
                    document.getElementById("commentTextField").value = "";
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
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  postComment,
  deleteComment,
  likePost
})(PostComponent);
