import React from "react";
import { logout } from "../../actions/authActions";
import {
  getNotifications,
  deleteNotification,
} from "../../actions/notificationsActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
      // width: 200,
    },
  },
  notificaiton: {
    width: 400,
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 16,
    [theme.breakpoints.down("xs")]: {
      width: 290,
      fontSize: 6,
    },
  },
  notifDelete: {
    float: "right",
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
          <img
            src={props.auth.user.image}
            alt="Profile Img"
            className={classes.userImg}
          />
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
                          props.deleteNotification(notif._id);
                        }}
                        className={classes.menuItem}
                      >
                        {notif.text}
                      </MenuItem>
                    </Link>
                  ) : (
                    <Link
                      to={{
                        pathname: `/profile/${notif.user}`,
                      }}
                      className={classes.link}
                    >
                      {notif.text}
                    </Link>
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
