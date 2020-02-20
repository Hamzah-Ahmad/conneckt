import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

//In the braces below, we are destructuring the props sent into this component. Provided the component prop and alias of Compoonent because we are going to use this component as a react component and those should start with a capital letter.
//...rest and ...props used below is sometimes referred to as react ...props syntax. You can find info about it at https://www.robinwieruch.de/react-pass-props-to-component under the react ...props syntax heading
//The render function used below is Router's render function
const ProtectedRoute = ({ component: Component, auth, ...rest }) => {
  const { isAuthenticated } = auth;
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  msg: "Please sign in to perform this action"
                }
              }}
            />
          );
        }
      }}
    />
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(ProtectedRoute);
