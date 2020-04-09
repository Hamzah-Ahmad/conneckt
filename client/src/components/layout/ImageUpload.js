import React from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";
import { getNotifications } from "../../actions/notificationsActions";
import { loadUser, changeImage } from "../../actions/authActions";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
// import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  editIcon: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));
const ImageUpload = (props) => {
  const classes = useStyles();

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
      {/* <input type="file" name="file" onChange={uploadImage} /> */}
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={uploadImage}
      />
      <label htmlFor="raised-button-file">
        <Button
          color="default"
          variant="outlined"
          component="span"
          className={classes.button}
        >
          <EditIcon className={classes.editIcon} />{" "}
          <small style={{ marginLeft: "5px" }}>Upload New</small>
        </Button>
      </label>
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
