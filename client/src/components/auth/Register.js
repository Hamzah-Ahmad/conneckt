/* eslint-disable */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { connect } from "react-redux";
import { register } from "../../actions/authActions";
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

const Register = props => {
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

  const onSubmit = e => {
    e.preventDefault();

    // const { name, email, password } = this.state;

    // Create user object
    const newUser = {
      name,
      email,
      password
    };

    // Attempt to register
    props.register(newUser);
  };
  return (
    <div>
      <div className={classes.root}>
        {msg ? <p color="danger">{msg}</p> : null}
        <form onSubmit={onSubmit}>
          <TextField
            className={classes.textField}
            label="Name"
            variant="outlined"
            type="text"
            name="name"
            id="name"
            onChange={e => setName(e.target.value)}
          />

          <br />
          <TextField
            className={classes.textField}
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            id="email"
            onChange={e => setEmail(e.target.value)}
          />
          <br />
          <TextField
            className={classes.textField}
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
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
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(Register);
