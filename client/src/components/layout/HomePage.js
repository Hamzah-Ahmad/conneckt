import React from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";
import AppNavbar from "./AppNavbar";

const HomePage = props => {
  React.useEffect(() => {
    props.getPosts();
    // eslint-disable-next-line
  }, []);
  const posts = props.postsReducer.posts;
  console.log(posts);
  const { isAuthenticated } = props.auth;
  return (
    <div>
      <AppNavbar />
      {props.location.state && !isAuthenticated ? (
        <p color="danger">{props.location.state.msg}</p>
      ) : null}

      <div>
        {posts && posts.map(post => <div key={post._id}>{post.content}</div>)}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  postsReducer: state.posts
});

export default connect(mapStateToProps, { getPosts })(HomePage);
