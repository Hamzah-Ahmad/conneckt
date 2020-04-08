import React from "react";

import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";
import { getNotifications } from "../../actions/notificationsActions";
import { loadUser, changeImage } from "../../actions/authActions";
import AppNavbar from "./AppNavbar";
import PostComponent from "../post/PostComponent";
import PostTextBox from "./PostTextBox";
import Container from "@material-ui/core/Container";
import axios from "axios";
import ImageUpload from "./ImageUpload";
// import { Link } from "react-router-dom";

const HomePage = (props) => {
  React.useEffect(() => {
    props.getPosts();
    // eslint-disable-next-line
  }, [props.comments, props.likes, props.singlePost]);
  const posts = props.posts.posts;
  const { isAuthenticated } = props.auth;

  const uploadImage = async (e) => {
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append("upload_preset", "connekt");
    formData.append("file", files);
    const data = await axios.post(
      "https://api.cloudinary.com/v1_1/dbqbqfiyn/image/upload",
      formData
    );
    props.changeImage(data, props.loadUser);
    // console.log(imageUrl);
  };
  return (
    <div>
      <AppNavbar />
      {/* <input type="file" name="file" onChange={uploadImage} /> */}
      <ImageUpload />
      <Container maxWidth="sm">
        {props.location.state && !isAuthenticated ? (
          <p color="danger">{props.location.state.msg}</p>
        ) : null}

        <div>
          <img
            src={props.auth.user.image}
            style={{ width: "30px", height: "30px" }}
          />
          <PostTextBox />
          {posts &&
            posts.map((post) => (
              <div key={post._id}>
                <PostComponent post={post} />
              </div>
            ))}
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
  getPosts,
  changeImage,
  getNotifications,
  loadUser,
})(HomePage);
