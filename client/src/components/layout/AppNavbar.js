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
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import HomeIcon from "@material-ui/icons/Home";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  button: {
    justifyContent: "flex-start",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  notificaiton: {
    // backgroundColor: "red",
    width: 400,
    display: "flex",
    justifyContent: "space-between",
    fontSize: 14,
    [theme.breakpoints.down("xs")]: {
      width: 310,
      fontSize: 12,
    },
  },
  notifDelete: {
    float: "right",
  },
  title: {
    flexGrow: 1,
  },
}));

const AppNavbar = (props) => {
  // const [newNotif, setNewNotif] = React.useState(false);
  React.useEffect(() => {
    props.getNotifications();
    // console.log(`Post author id: ${props.auth.user._id} & type is ${typeof props.auth.user._id}`)
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();
  //Notification Menu
  // const handleClick = event => {
  //   setAnchorEl(event.currentTarget);
  // };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const notifications = props.notifications.notifications;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Connekt
          </Typography>
          <IconButton
            color="inherit"
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
              // setNewNotif(false);
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
                <MenuItem
                  onClick={() => {
                    // props.deleteNotification(notif._id);
                    // handleClose();
                  }}
                  key={notif._id}
                  className={classes.notificaiton}
                >
                  {notif.post ? (
                    <Link
                      to={{
                        pathname: `/post/${notif.post}`,
                        // state: { post: notif.post }
                      }}
                      className={classes.link}
                    >
                      {notif.text}
                    </Link>
                  ) : (
                    <Link
                      to={{
                        pathname: `/profile/${notif.user}`,
                        // state: { post: notif.post }
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
                </MenuItem>
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
    </div>
  );
};

//{isAuthenticated ? authLinks : guestLinks}

const mapStateToProps = (state) => ({
  auth: state.auth,
  notifications: state.notifications,
});

export default connect(mapStateToProps, {
  logout,
  getNotifications,
  deleteNotification,
})(AppNavbar);
