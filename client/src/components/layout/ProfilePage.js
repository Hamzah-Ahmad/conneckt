import React, { useState } from "react";
import { connect } from "react-redux";
import { getPostsByProfile } from "../../actions/postActions";
import { getNotifications } from "../../actions/notificationsActions";
import { loadUser } from "../../actions/authActions";
import AppNavbar from "./AppNavbar";
import PostComponent from "../post/PostComponent";
import Container from "@material-ui/core/Container";
import axios from "axios";
// import { Link } from "react-router-dom";

const ProfilePage = (props) => {
  const [profile, setProfile] = useState();

  const posts = props.posts.posts;
  const { isAuthenticated } = props.auth;
  React.useEffect(() => {
    props.getPostsByProfile(props.match.params.profileId);
    // console.log(typeof props.auth.user._id);
    // eslint-disable-next-line
  }, []);

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
              <small>{posts[0].author.name}</small>
              <small>{posts[0].author.followers.length}</small>
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
})(ProfilePage);
