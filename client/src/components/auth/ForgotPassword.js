/* eslint-disable */
import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const ForgotPassword = () => {
  // constructor() {
  //   super();

  //   this.state = {
  //     email: "",
  //     showError: false,
  //     messageFromServer: "",
  //     showNullError: false,
  //     loading: false,
  //     disableInputs: false
  //   };
  // }

  const [email, setEmail] = useState("");
  const [showError, setShowError] = useState(false);
  const [messageFromServer, setmessageFromServer] = useState("");
  const [showNullError, setShowNullError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disableInputs, setDisableInputs] = useState(false);

  // handleChange = name => event => {
  //   this.setState({
  //     [name]: event.target.value
  //   });
  // };

  const sendEmail = async e => {
    e.preventDefault();
    if (email === "") {
      // this.setState({
      //   showError: false,
      //   messageFromServer: "",
      //   showNullError: true
      // });
      setShowError(false);
      setmessageFromServer("");
      setShowNullError(true);
    } else {
      try {
        // this.setState({ loading: true });
        setLoading(true);
        const response = await axios.post("/api/auth/forgotPassword", {
          email
        });
        //console.log(response.data);
        if (response.data === "Recovery email sent") {
          // this.setState({
          //   showError: false,
          //   messageFromServer: "recovery email sent",
          //   showNullError: false,
          //   loading: false,
          //   disableInputs: true
          // });
          setShowError(false);
          setmessageFromServer("Recovery email sent");
          setShowNullError(false);
          setLoading(false);
          setDisableInputs(true);
        }
      } catch (error) {
        console.error(error.response.data);
        if (error.response.data === "email not in db") {
          // this.setState({
          //   showError: true,
          //   messageFromServer: "",
          //   showNullError: false,
          //   loading: false
          // });
          setShowError(true);
          setmessageFromServer("");
          setShowNullError(false);
          setLoading(false);
        } else {
          console.log(error);
          //this.props.history.push("/");
        }
      }
    }
  };

  return (
    <div>
      {showNullError && (
        <div>
          <small color="danger">The email address cannot be null.</small>
        </div>
      )}
      {showError && (
        <div>
          <small color="danger">
            That email address isn't recognized. Pease try again or register for
            a new account.
          </small>
          {/* <LinkButtons
              buttonText="Register"
              buttonStyle={registerButton}
              link="/register"
            /> */}
        </div>
      )}
      {/* {loading && <div>Loading...</div>} */}
      {messageFromServer === "Recovery email sent" && (
        <div>Password Reset Email Successfully Sent!</div>
      )}

      <form className="profile-form" onSubmit={sendEmail}>
        <input
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email Address"
          disabled={disableInputs}
        />
        <button
          color="dark"
          block
          style={{ marginTop: "20px", marginBottom: "30px" }}
          disabled={loading}
          disabled={disableInputs}
        >
          {loading ? <span>Loading...</span> : <span>Send Reset Email</span>}
        </button>
      </form>

      <Link to="/login">
        <span>Go to Login page</span>
      </Link>
      {/* <LinkButtons buttonText="Go Home" buttonStyle={homeButton} link="/" /> */}
    </div>
  );
};

export default ForgotPassword;
