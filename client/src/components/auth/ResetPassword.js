/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// const loading = {
//   margin: "1em",
//   fontSize: "24px"
// };

const ResetPassword = props => {
  // constructor() {
  //   super();

  //   this.state = {
  //     email: "",
  //     password: "",
  //     updated: false,
  //     isLoading: true,
  //     error: false
  //   };
  // }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [updated, setUpdated] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    //We created a function here because just running an async function directly broke the applciation and produced the following warning:
    //It looks like you wrote useEffect(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:
    async function updateFunc() {
      const {
        match: {
          params: { token }
        }
      } = props;
      try {
        const response = await axios.get("/api/auth/reset", {
          params: {
            resetPasswordToken: token
          }
        });
        console.log(response);
        if (response.data.message === "password reset link a-ok") {
          console.log(response);
          // this.setState({
          //   email: response.data.email,
          //   updated: false,
          //   isLoading: false,
          //   error: false
          // });
          setEmail(response.data.email);
          setUpdated(false);
          setIsLoading(false);
          setError(false);
        }
      } catch (error) {
        console.log(error.response);
        // this.setState({
        //   updated: false,
        //   isLoading: false,
        //   error: true
        // });
        setUpdated(false);
        setIsLoading(false);
        setError(true);
      }
    }
    updateFunc();
  }, []);

  // handleChange = name => event => {
  //   this.setState({
  //     [name]: event.target.value
  //   });
  // };

  const updatePassword = async e => {
    e.preventDefault();
    const {
      match: {
        params: { token }
      }
    } = props;
    try {
      const response = await axios.put("/api/auth/updatePasswordViaEmail", {
        email,
        password,
        resetPasswordToken: token
      });
      console.log(response.data);
      if (response.data.message === "password updated") {
        // this.setState({
        //   updated: true,
        //   error: false
        // });
        setUpdated(true);
        setError(false);
      } else {
        console.log(response.data.message);
        // this.setState({
        //   updated: false,
        //   error: true
        // });
        setUpdated(false);
        setError(true);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  if (error) {
    return (
      <div>
        <small color="danger">
          Problem resetting password. Send another reset link.
        </small>
        <p>{error}</p>
        {/* <LinkButtons buttonText="Go Home" link="/" />
            <LinkButtons buttonText="Forgot Password?" link="/forgotPassword" /> */}

        <Link to="/forgotPassword">
          <div>Forgot Password</div>
        </Link>

        <Link to="/">
          <div style={{ marginTop: "10px" }}>Go home</div>
        </Link>
      </div>
    );
  }
  if (isLoading) {
    const centered = {
      position: "fixed" /* or absolute */,
      top: "50%",
      left: "50%"
    };
    return (
      // <Spinner animation="border" style={centered} />
      <p style={centered}>Loading...</p>
    );
  }
  return (
    <div>
      {updated && (
        <div>
          <small>
            Your password has been successfully reset, please try logging in
            again.
          </small>
          {/* <Link to="/login">
              <Button>Login</Button>
            </Link> */}
        </div>
      )}
      <form className="password-form" onSubmit={updatePassword}>
        <input
          id="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
          type="password"
          disabled={updated}
        />
        <button
          type="submit"
          block
          disabled={updated}
          color="dark"
          style={{ marginTop: "20px" }}
        >
          Update Password
        </button>
      </form>

      <Link to="/login">Go to Login page</Link>
    </div>
  );
};

export default ResetPassword;
