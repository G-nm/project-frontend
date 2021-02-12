import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export const ProtectedOrgRoute = ({ component: Component, ...rest }) => {
  // Check if user is logged in
  // Check if user has org role

  const { role, loggedin } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) => {
        return loggedin && role === "Organisation" ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );
      }}
    />
  );
};
