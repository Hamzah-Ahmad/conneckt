import React, { useState } from "react";
import EditPost from "./EditPost";
import { postComment, deleteComment } from "../../actions/commentActions";
import { likePost } from "../../actions/likeActions";
import { deletePost, editPost } from "../../actions/postActions";
import { followUser } from "../../actions/followActions";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CommentBoxComponent from "./CommentBoxComponent";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";

// import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";
// import CommentComponent from "./CommentComponent";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import GradeOutlinedIcon from "@material-ui/icons/GradeOutlined";
// import GradeIcon from "@material-ui/icons/Grade";
// import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  comment: {
    borderRadius: "20px",
    // border: "1px solid grey",
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
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  post: {
    border: "1px solid grey",
    padding: theme.spacing(2),
    marginTop: theme.spacing(4)
  },
  postInfo: {
    display: "flex",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 14
  }
}));

const PostComponent = props => {
  const classes = useStyles();

  //Simple Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Edit Post Dialog
  const [dialogOpen, setDialogOpen] = useState(false);

  //Comments Modal
  const [commentDialogOpen, setCommentOpen] = useState(false);
  // React.useEffect(() => console.log(props));
  return (
    <div className={classes.post}>
      {/* Simple Menu Component */}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            setDialogOpen(true);
            handleClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.deletePost(props.post._id, null, false);
            handleClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      {/* Edit Post Component */}
      <EditPost
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        postId={props.post._id}
        content={props.post.content}
        editPost={props.editPost}
      />

      <div className={classes.postInfo}>
        <div
          className={classes.title}
          onClick={() => {
            props.followUser(props.post.author._id);
          }}
        >
          {props.post.author.name}
        </div>
        <div>
          {props.post.author._id === props.auth.user._id ? (
            <div>
              <small> Following : {props.followReducer.following.length}</small>
              <IconButton onClick={handleClick} size="small">
                <MoreHorizIcon />
              </IconButton>
            </div>
          ) : null}
        </div>
      </div>
      <div className={classes.content}>{props.post.content}</div>
      <IconButton
        onClick={() => {
          props.likePost(props.post._id);
        }}
      >
        {props.post.likes.includes(props.auth.user._id) ? (
          <EmojiEmotionsIcon color="primary" />
        ) : (
          <InsertEmoticonIcon />
        )}
      </IconButton>
      <small>{props.post.likes.length}</small>
      <IconButton
        onClick={() => {
          setCommentOpen(true);
        }}
      >
        <ChatOutlinedIcon />
      </IconButton>
      <small>{props.post.comments.length}</small>

      <CommentBoxComponent
        {...props}
        commentDialogOpen={commentDialogOpen}
        setCommentOpen={setCommentOpen}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  followReducer: state.followReducer
});

export default connect(mapStateToProps, {
  postComment,
  deleteComment,
  likePost,
  deletePost,
  editPost,
  followUser
})(PostComponent);
