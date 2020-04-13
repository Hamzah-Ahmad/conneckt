import React from "react";
import { logout } from "../../actions/authActions";
import {
  getNotifications,
  deleteNotification,
} from "../../actions/notificationsActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import HomeIcon from "@material-ui/icons/Home";
import ClearIcon from "@material-ui/icons/Clear";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  button: {
    justifyContent: "flex-start",
  },
  followBack: {
    padding: 4,
    margin: 0,
    textTransform: "none",
    wordSpacing: "5px",
    [theme.breakpoints.down("md")]: {
      fontSize: 12,
    },
  },

  link: {
    width: "100%",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuItem: {
    fontSize: 14,
    [theme.breakpoints.down("xs")]: {
      fontSize: 12,
    },
  },
  notificaiton: {
    width: 440,
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      width: 290,
    },
  },

  notifImg: {
    height: 35,
    widtht: 35,
    marginRight: 5,
    borderRadius: 100,
    [theme.breakpoints.down("xs")]: {
      height: 15,
      widtht: 15,
    },
  },
  title: {
    color: "#fff",
    flexGrow: 1,
    marginLeft: 50,
    [theme.breakpoints.down("md")]: {
      marginLeft: 30,
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 10,
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  userImg: {
    height: 30,
    width: 30,
    borderRadius: 100,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

const AppNavbar = (props) => {
  React.useEffect(() => {
    props.getNotifications();
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const notifications = props.notifications.notifications;
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            <Link to="/" style={{ color: "white" }}>
              Connekt
            </Link>
          </Typography>
          {/* <img
            src={props.auth.user.image}
            alt="Profile Img"
            className={classes.userImg}
          /> */}
          <IconButton
            color="inherit"
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
            className={classes.button}
          >
            {notifications.length > 0 ? (
              <NotificationsActiveIcon style={{ color: "red" }} />
            ) : (
              <NotificationsNoneIcon />
            )}
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <div
                  // onClick={() => {
                  //   // props.deleteNotification(notif._id);
                  //   handleClose();
                  // }}
                  key={notif._id}
                  className={classes.notificaiton}
                >
                  {notif.post ? (
                    <Link
                      to={{
                        pathname: `/post/${notif.post}`,
                      }}
                      className={classes.link}
                    >
                      <MenuItem
                        onClick={() => {
                          // props.deleteNotification(notif._id);
                          console.log(notif);
                        }}
                        className={classes.menuItem}
                      >
                        <img
                          src={notif.userImg}
                          alt="User Image"
                          className={classes.notifImg}
                        />
                        <div style={{ width: "30px" }}>{notif.text}</div>
                      </MenuItem>
                    </Link>
                  ) : (
                    <div className={classes.link}>
                      <MenuItem
                        onClick={() => {
                          // props.deleteNotification(notif._id);
                          console.log(notif);
                        }}
                        className={classes.menuItem}
                      >
                        <img src={notif.userImg} className={classes.notifImg} />
                        {notif.text}
                      </MenuItem>
                    </div>
                  )}

                  <IconButton
                    className={classes.notifDelete}
                    onClick={(e) => {
                      props.deleteNotification(notif._id);
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </div>
              ))
            ) : (
              <div style={{ margin: "10px 30px" }}>No Notifications</div>
            )}
          </Menu>

          <Link to="/">
            <HomeIcon style={{ color: "white" }} />
          </Link>
          <IconButton
            color="inherit"
            onClick={props.logout}
            className={classes.button}
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  notifications: state.notifications,
});

export default connect(mapStateToProps, {
  logout,
  getNotifications,
  deleteNotification,
})(AppNavbar);
