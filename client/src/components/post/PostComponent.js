import React, { useState } from "react";
import { postComment } from "../../actions/commentActions";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputIcon from "@material-ui/icons/Input";

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
  // console.log(props);
  // React.useEffect(() => {
  //   console.log(props.auth);
  // }, [props.comments]);
  const classes = useStyles();
  const [commentText, setCommentText] = useState("");
  const [delBtnState, setDltBtnState] = useState("");
  return (
    <div className={classes.post}>
      <div className={classes.title}>{props.post.author.name}</div>
      <div className={classes.content}>{props.post.content}</div>
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
                <InputIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <div>
        {props.post.comments.map(comment => (
          <div className={classes.comment} key={comment._id}>
            <div className={classes.commentMaterial}>
              <div className={classes.commentAuthor}>{comment.authorName}</div>
              <div className={classes.commentText}>{comment.commentText}</div>
            </div>
            <div>
              {props.auth.user._id == props.post.author._id ||
              props.auth.user._id == comment.author ? (
                <small className={classes.commentDltBtn}>Remove</small>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { postComment })(PostComponent);
