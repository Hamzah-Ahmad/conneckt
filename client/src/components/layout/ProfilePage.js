import React, { useState } from "react";
import { connect } from "react-redux";
import { getPostsByProfile } from "../../actions/postActions";
import { getNotifications } from "../../actions/notificationsActions";
import { followUser } from "../../actions/followActions";

import { loadUser } from "../../actions/authActions";
import AppNavbar from "./AppNavbar";
import PostComponent from "../post/PostComponent";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  followInfo: {
    display: "flex",
    marginTop: 6,
    fontSize: 18,
    [theme.breakpoints.down("xs")]: {
      // display: "block",
      marginTop: 3,
      fontSize: 14,
    },
  },
  profileInfo: {
    display: "flex",
    alignItems: "center",
    marginTop: 20,
  },
  profileImg: {
    height: 140,
    width: 140,
    borderRadius: 100,
    marginRight: 20,
    [theme.breakpoints.down("xs")]: {
      height: 70,
      width: 70,
    },
  },

  username: {
    fontSize: 40,
    [theme.breakpoints.down("xs")]: {
      fontSize: 20,
    },
  },
}));
const ProfilePage = (props) => {
  const [profile, setProfile] = useState();
  const classes = useStyles();

  const posts = props.posts.posts;
  const { isAuthenticated } = props.auth;
  React.useEffect(() => {
    props.getPostsByProfile(props.match.params.profileId);
    // console.log(typeof props.auth.user._id);
    // eslint-disable-next-line
  }, [props.comments, props.likes, props.singlePost, props.followReducer]);

  return (
    <div>
      <AppNavbar />
      <Container maxWidth="sm">
        <div></div>
        {props.location.state && !isAuthenticated ? (
          <p color="danger">{props.location.state.msg}</p>
        ) : null}
        <div>
          {posts && posts.length > 0 ? (
            <div>
              <div className={classes.profileInfo}>
                <img
                  src={posts[0].author.image}
                  alt="Profile Image"
                  className={classes.profileImg}
                />
                <div>
                  <div className={classes.username}>{posts[0].author.name}</div>
                  <div className={classes.followInfo}>
                    <div style={{ marginRight: "10px" }}>
                      Followers: {posts[0].author.followers.length}
                    </div>
                    <div>Following: {posts[0].author.following.length}</div>
                  </div>
                  {posts[0].author._id !== props.auth.user._id ? (
                    <button
                      onClick={() => props.followUser(posts[0].author._id)}
                    >
                      {props.followReducer.following.includes(
                        posts[0].author._id
                      ) ? (
                        <span>Unfollow</span>
                      ) : (
                        <span>Follow</span>
                      )}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
          {posts &&
            posts.map((post) => {
              //   console.log(typeof post.author._id);
              //   console.log(props.auth.user._id);

              return (
                <div key={post._id}>
                  <PostComponent post={post} />
                </div>
              );
            })}
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.posts,
  comments: state.comments,
  likes: state.likes,
  singlePost: state.singlePost,
  notifications: state.notifications,
  followReducer: state.followReducer,
});

export default connect(mapStateToProps, {
  getPostsByProfile,
  getNotifications,
  loadUser,
  followUser,
})(ProfilePage);
