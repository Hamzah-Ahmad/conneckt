import React, { useState, useEffect } from "react";
import EditPost from "../post/EditPost";
import { connect } from "react-redux";
import { getPost } from "../../actions/postActions";
import { likePost } from "../../actions/likeActions";
import { deletePost, editPost } from "../../actions/postActions";
import { postComment, deleteComment } from "../../actions/commentActions";
import CommentBoxComponent from "../post/CommentBoxComponent";
import AppNavBar from "./AppNavbar";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  comment: {
    borderRadius: "20px",
    // border: "1px solid grey",
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    background: "#fff",
    display: "flex",
  },
  commentAuthor: {
    fontSize: "12px",
  },
  commentDltBtn: {},
  commentMaterial: {
    flex: "2",
  },
  commentText: {
    fontSize: "14px",
  },
  content: {
    fontSize: 18,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  likeIcon: {
    paddingLeft: 0,
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  post: {
    border: "1px solid grey",
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  postInfo: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    display: "flex",
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    paddingLeft: 8,
  },
}));

const PostPage = (props) => {
  useEffect(() => {
    // console.log("getPost ran " + props.match.params.postId);
    props.getPost(props.match.params.postId);
    //eslint-disable-next-line
  }, [props.comments, props.likes, props.singlePost]);
  const classes = useStyles();

  //Simple Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Edit Post Dialog
  const [dialogOpen, setDialogOpen] = useState(false);

  //Comments Modal
  const [commentDialogOpen, setCommentOpen] = useState(false);
  const post = props.post;
  return (
    <div>
      <AppNavBar />
      {/* <button onClick={() => console.log(props)}>Check Props</button>  */}
      <Container maxWidth="md">
        {post ? (
          Object.keys(post).length > 0 ? (
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
                    props.deletePost(post._id, props.history, true);

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
                postId={post._id}
                content={post.content}
                editPost={props.editPost}
              />
              <div className={classes.postInfo}>
                <div className={classes.title}>
                  <img src={post.author.image} className={classes.image} />
                  <Link to={`/profile/${post.author._id}`}>
                    <div className={classes.userName}>
                      {props.post.author.name}
                    </div>
                  </Link>
                </div>
                <div>
                  {post.author._id === props.auth.user._id ? (
                    <IconButton onClick={handleClick} size="small">
                      <MoreHorizIcon />
                    </IconButton>
                  ) : null}
                </div>
              </div>
              <div className={classes.content}>{post.content}</div>
              <IconButton
                onClick={() => {
                  props.likePost(post._id);
                }}
                className={classes.likeIcon}
              >
                {post.likes.includes(props.auth.user._id) ? (
                  <EmojiEmotionsIcon color="primary" />
                ) : (
                  <InsertEmoticonIcon />
                )}
              </IconButton>
              <small>{post.likes.length}</small>
              <IconButton
                onClick={() => {
                  setCommentOpen(true);
                }}
              >
                <ChatOutlinedIcon />
              </IconButton>
              <small>{post.comments.length}</small>
              <CommentBoxComponent
                {...props}
                commentDialogOpen={commentDialogOpen}
                setCommentOpen={setCommentOpen}
              />
            </div>
          ) : (
            <div>Loading</div>
          )
        ) : (
          <div>Post Not Found</div>
        )}
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.singlePost.post,
  comments: state.comments,
  likes: state.likes,
  followReducer: state.followReducer,
});
export default connect(mapStateToProps, {
  getPost,
  postComment,
  deleteComment,
  likePost,
  deletePost,
  editPost,
})(PostPage);
