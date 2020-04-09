import React from "react";

import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";
import { getNotifications } from "../../actions/notificationsActions";
import { loadUser, changeImage } from "../../actions/authActions";
import AppNavbar from "./AppNavbar";
import PostComponent from "../post/PostComponent";
import PostTextBox from "./PostTextBox";
import Container from "@material-ui/core/Container";
import ImageUpload from "./ImageUpload";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  homePage: {
    display: "flex",
  },
  mainSection: {},
  sideBar: {
    background: "#fafafa",
    height: "100vh",
    width: "18vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "sticky",
    top: 0,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
      width: "15vw",
    },
    [theme.breakpoints.up("lg")]: {
      display: "flex",
    },
  },
  root: {
    // [theme.breakpoints.down("sm")]: {
    //   backgroundColor: "yellow",
    // },
    // [theme.breakpoints.up("md")]: {
    //   backgroundColor: "purple",
    // },
    // [theme.breakpoints.up("lg")]: {
    //   backgroundColor: "green",
    // },
  },
  userImage: {
    marginTop: 30,
    marginBottom: 15,
    height: 160,
    width: 160,
    borderRadius: 100,

    [theme.breakpoints.down("md")]: {
      height: 100,
      width: 100,
    },
    [theme.breakpoints.up("lg")]: {
      display: "flex",
    },
  },
}));
const HomePage = (props) => {
  const classes = useStyles();

  React.useEffect(() => {
    props.getPosts();
    // eslint-disable-next-line
  }, [props.comments, props.likes, props.singlePost]);
  // React.useEffect(() => {
  //   props.loadUser();
  // }, []);
  const posts = props.posts.posts;
  const { isAuthenticated } = props.auth;

  // const uploadImage = async (e) => {
  //   const files = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append("upload_preset", "connekt");
  //   formData.append("file", files);
  //   const data = await axios.post(
  //     "https://api.cloudinary.com/v1_1/dbqbqfiyn/image/upload",
  //     formData
  //   );
  //   props.changeImage(data, props.loadUser);
  //   // console.log(imageUrl);
  // };
  return (
    <div className={classes.root}>
      <AppNavbar />
      {/* <input type="file" name="file" onChange={uploadImage} /> */}
      {/* <ImageUpload /> */}
      <div className={classes.homePage}>
        {props.followReducer.followers && (
          <div className={classes.sideBar}>
            <img src={props.auth.user.image} className={classes.userImage} />
            <ImageUpload />
            <div style={{ marginTop: "20px" }}>
              Following: {props.followReducer.following.length}
            </div>
            <div style={{ marginTop: "20px" }}>
              Followers: {props.followReducer.followers.length}
            </div>
          </div>
        )}
        <Container maxWidth="md" className={classes.mainSection}>
          {props.location.state && !isAuthenticated ? (
            <p color="danger">{props.location.state.msg}</p>
          ) : null}

          <div>
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
