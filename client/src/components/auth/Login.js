import React, { useState, useEffect } from "react";

import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

const useStyles = makeStyles(theme => ({
  button: {
    display: "block"
  },
  link: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(6)
  },
  textField: {
    marginBottom: theme.spacing(3),
    width: 320
  }
}));

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const { error, isAuthenticated, isLoading } = props;
  const classes = useStyles();

  useEffect(() => {
    if (error) {
      if (error.id === "LOGIN_FAIL") {
        console.log("Error is " + error);
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

  const onSubmit = e => {
    e.preventDefault();

    // Create user object
    const user = {
      email,
      password
    };

    // Attempt to login
    props.login(user);
  };

  return (
    <div className={classes.root}>
      {msg ? <p color="danger">{msg}</p> : null}
      {props.isLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={onSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            className={classes.textField}
            name="email"
            id="email"
            onChange={e => setEmail(e.target.value)}
          />
          <br />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            id="password"
            className={classes.textField}
            onChange={e => setPassword(e.target.value)}
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
          <Link className={classes.link} to="/forgotPassword">
            Forgot Password
          </Link>
        </form>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
