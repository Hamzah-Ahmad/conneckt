import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

const Login = props => {
  // state = {
  //   modal: false,
  //   email: "",
  //   password: "",
  //   msg: null
  // };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { error, isAuthenticated } = props;

  // componentDidUpdate(prevProps) {
  //   const { error, isAuthenticated } = this.props;
  //   if (error !== prevProps.error) {
  //     // Check for register error
  //     if (error.id === "LOGIN_FAIL") {
  //       this.setState({ msg: error.msg.msg });
  //     } else {
  //       this.setState({ msg: null });
  //     }
  //   }

  //   if (isAuthenticated) {
  //     this.props.history.push("/");
  //   }
  // }

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
  }, [error, isAuthenticated]);

  // const onChange = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

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
    <div>
      {msg ? <p color="danger">{msg}</p> : null}
      <form onSubmit={onSubmit}>
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="mb-3"
          onChange={e => setEmail(e.target.value)}
        />

        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="mb-3"
          onChange={e => setPassword(e.target.value)}
        />
        <button color="dark" style={{ marginTop: "2rem" }} block>
          Login
        </button>
      </form>
      <Link to="/register">Not a member?</Link>
      <div style={{ marginTop: "20px" }}>
        <Link to="/forgotPassword">Forgot Password </Link>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
