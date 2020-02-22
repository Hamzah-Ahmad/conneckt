import React from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";
import AppNavbar from "./AppNavbar";
import PostComponent from "../post/PostComponent";

import Container from "@material-ui/core/Container";

const HomePage = props => {
  React.useEffect(() => {
    props.getPosts();
    // eslint-disable-next-line
  }, [props.comments, props.likes]);
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
  likes: state.likes
});

export default connect(mapStateToProps, { getPosts })(HomePage);
