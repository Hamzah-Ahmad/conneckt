import React from "react";
import { connect } from "react-redux";
import { getPosts } from "../actions/postActions";
import Logout from "./auth/Logout";

const HomePage = props => {
  React.useEffect(() => {
    props.getPosts();
    // eslint-disable-next-line
  }, []);
  const posts = props.postsReducer.posts;
  console.log(posts);
  const { isAuthenticated, user } = props.auth;
  return (
    <div>
      {props.location.state && !isAuthenticated ? (
        <p color="danger">{props.location.state.msg}</p>
      ) : null}
      <h3>Landing Page</h3>
      <h3>{user ? `${user.name}` : ""}</h3>
      <div>
        {posts && posts.map(post => <div key={post._id}>{post.content}</div>)}
      </div>
      <Logout />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  postsReducer: state.posts
});

export default connect(mapStateToProps, { getPosts })(HomePage);
