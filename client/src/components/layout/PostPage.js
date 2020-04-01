import React, {useState, useEffect} from "react";
import EditPost from "../post/EditPost";
import {connect} from "react-redux";
import {getPost} from '../../actions/postActions'
import { likePost } from "../../actions/likeActions";
import { deletePost, editPost } from "../../actions/postActions";
import { postComment, deleteComment } from "../../actions/commentActions";
import CommentBoxComponent from "../post/CommentBoxComponent";
import PostComponent from '../post/PostComponent';


import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";

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

const PostPage = props => {
  useEffect(() => {
    props.getPost(props.match.params.postId);
  }, [])
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
  return (
    <div className={classes.post}>
      <button onClick={() => console.log(props)}>Check Props</button> 
      {Object.keys(props.post).length > 0 ?
      <PostComponent post={props.post} /> : <div>Loading</div>}
      
  </div>
  )
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.singlePost.post
});
export default connect(mapStateToProps, {getPost})(PostPage);
