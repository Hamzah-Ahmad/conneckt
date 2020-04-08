import React from "react";

import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";
import { getNotifications } from "../../actions/notificationsActions";
import { loadUser, changeImage } from "../../actions/authActions";
import axios from "axios";
// import { Link } from "react-router-dom";

const ImageUpload = (props) => {
  React.useEffect(() => {
    props.getPosts();
    // eslint-disable-next-line
  }, [props.comments, props.likes, props.singlePost]);

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
  };
  return (
    <div>
      {" "}
      <input type="file" name="file" onChange={uploadImage} />
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   posts: state.posts,
//   comments: state.comments,
//   likes: state.likes,
//   singlePost: state.singlePost,
//   notifications: state.notifications,
//   followReducer: state.followReducer,
// });

export default connect(null, {
  getPosts,
  changeImage,
  getNotifications,
  loadUser,
})(ImageUpload);
