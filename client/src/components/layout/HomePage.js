import React from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";
import AppNavbar from "./AppNavbar";
import PostComponent from "../post/PostComponent";

import Container from "@material-ui/core/Container";

const HomePage = props => {
  React.useEffect(() => {
    //console.log(props);
    props.getPosts();
    // eslint-disable-next-line
  }, [props.comments]);
  const posts = props.postsReducer.posts;
  // console.log(posts);
  const { isAuthenticated } = props.auth;
  return (
    <div>
      <AppNavbar />
      {/*remove sm to increase width of the container */}
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
  postsReducer: state.posts,
  comments: state.comments
});

export default connect(mapStateToProps, { getPosts })(HomePage);
