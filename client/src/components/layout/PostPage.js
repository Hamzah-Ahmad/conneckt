import React from "react";
import {connect} from "react-redux";
import {getPost} from '../../actions/postActions'
// import PostComponent from "../post/PostComponent";

const PostPage = props => {
  React.useEffect(() => {
    props.getPost(props.match.params.postId);
  }, [])
  console.log(props);
  return <div>Test</div>;
};

const mapStateToProps = state => ({
  auth: state.auth,
  
});
export default connect(mapStateToProps, {getPost})(PostPage);
