import React from "react";
import { logout } from "../../actions/authActions";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import Icon from "@material-ui/core/Icon";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  button: {
    justifyContent: "flex-start"
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const AppNavbar = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h4" className={classes.title}>
            Connekt
          </Typography>
          <Typography>{props.auth.user && props.auth.user.name}</Typography>
          <Button
            color="inherit"
            onClick={props.logout}
            className={classes.button}
          >
            <ExitToAppIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

//{isAuthenticated ? authLinks : guestLinks}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(AppNavbar);
