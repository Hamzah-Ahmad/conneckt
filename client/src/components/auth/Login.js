import React, { useState, useEffect } from "react";

import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginBottom: 25,
  },
  errMsg: {
    color: "red",
  },
  form: {
    border: "1px solid #1e88e5",
    borderRadius: 20,
    padding: "80px 20px",
    [theme.breakpoints.down("xs")]: {
      border: "none",
      padding: "0px",
    },
  },
  link: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  textField: {
    marginBottom: theme.spacing(6),
    width: 320,
    [theme.breakpoints.down("xs")]: {
      width: 240,
    },
  },
  pageContent: {
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
  },
  pageHeader: {
    fontSize: 40,
    marginBottom: 20,
    [theme.breakpoints.down("xs")]: {
      fontSize: 28,
      marginBottom: 20,
    },
    color: "#1e88e5",
  },
}));

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const { error, isAuthenticated, isLoading } = props;
  const classes = useStyles();

  useEffect(() => {
    if (error) {
      if (error.id === "LOGIN_FAIL") {
        // console.log("Error is " + error);
        setMsg(error.msg.msg);
      } else {
        setMsg(null);
      }
    }

    if (isAuthenticated) {
      props.history.push("/");
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, isLoading]);

  const onSubmit = (e) => {
    e.preventDefault();

    // Create user object
    const user = {
      email,
      password,
    };

    // Attempt to login
    props.login(user);
  };

  return (
    <div className={classes.root}>
      {props.isLoading ? (
        <Spinner />
      ) : (
        <div className={classes.pageContent}>
          <div className={classes.pageHeader}>Login To Connekt</div>
          {msg ? <p className={classes.errMsg}>{msg}</p> : null}

          <form onSubmit={onSubmit} className={classes.form}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              className={classes.textField}
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              id="password"
              className={classes.textField}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              type="submit"
            >
              Login
            </Button>
            <Link className={classes.link} to="/register">
              Not a member?
            </Link>
            {/* <Link className={classes.link} to="/forgotPassword">
            Forgot Password
          </Link> */}
          </form>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
