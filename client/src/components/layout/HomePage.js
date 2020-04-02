import React from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";
import { getNotifications } from "../../actions/notificationsActions";
import { loadUser } from "../../actions/authActions";
import AppNavbar from "./AppNavbar";
import PostComponent from "../post/PostComponent";
import PostTextBox from "./PostTextBox";
import Container from "@material-ui/core/Container";
// import { Link } from "react-router-dom";

const HomePage = props => {
  React.useEffect(() => {
    props.getPosts();
    // eslint-disable-next-line
  }, [props.comments, props.likes, props.singlePost]);

  const posts = props.posts.posts;
  const { isAuthenticated } = props.auth;
  return (
    <div>
      <AppNavbar />

      <Container maxWidth="sm">
        {props.location.state && !isAuthenticated ? (
          <p color="danger">{props.location.state.msg}</p>
        ) : null}

        <div>
          <PostTextBox />
          {posts &&
            posts.map(post => (
              <div key={post._id}>
                <PostComponent post={post} />
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts,
  comments: state.comments,
  likes: state.likes,
  singlePost: state.singlePost,
  notifications: state.notifications,
  followReducer: state.followReducer
});

export default connect(mapStateToProps, {
  getPosts,
  getNotifications,
  loadUser
})(HomePage);
