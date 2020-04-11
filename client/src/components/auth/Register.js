/* eslint-disable */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { connect } from "react-redux";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import Spinner from "../layout/Spinner";

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
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  textField: {
    marginBottom: theme.spacing(3),
    width: 320,
    [theme.breakpoints.down("xs")]: {
      width: 240,
    },
  },
}));

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const classes = useStyles();

  const { error, isAuthenticated } = props;

  useEffect(() => {
    if (error) {
      if (error.id === "REGISTER_FAIL") {
        setMsg(error.msg.msg);
      } else {
        setMsg(null);
      }
    }

    if (isAuthenticated) {
      props.history.push("/");
    }
  }, [error, isAuthenticated]);

  // const onChange = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  const onSubmit = (e) => {
    e.preventDefault();

    // const { name, email, password } = this.state;

    // Create user object
    const newUser = {
      name,
      email,
      password,
    };

    // Attempt to register
    props.register(newUser);
  };
  return (
    <div>
      <div className={classes.root}>
        {props.isLoading ? (
          <Spinner />
        ) : (
          <div className={classes.pageContent}>
            <div className={classes.pageHeader}>SignUp to Connekt</div>
            {msg ? <p className={classes.errMsg}>{msg}</p> : null}

            <form onSubmit={onSubmit} className={classes.form}>
              <TextField
                className={classes.textField}
                label="Name"
                variant="outlined"
                type="text"
                name="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
              />

              <br />
              <TextField
                className={classes.textField}
                label="Email"
                variant="outlined"
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <TextField
                className={classes.textField}
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                className={classes.button}
                color="primary"
                variant="contained"
                type="submit"
              >
                Register
              </Button>
              <Link to="/login" className={classes.link}>
                Already a member?
              </Link>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(Register);
