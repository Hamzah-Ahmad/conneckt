import React from "react";
import { connect } from "react-redux";
import Logout from "./auth/Logout";

const Landingpage = props => {
  console.log(props);
  const { isAuthenticated, user } = props.auth;
  return (
    <div>
      {props.location.state && !isAuthenticated ? (
        <p color="danger">{props.location.state.msg}</p>
      ) : null}
      <h3>Landing Page</h3>
      <h3>{user ? `${user.name}` : ""}</h3>
      <div></div>
      <Logout />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landingpage);
