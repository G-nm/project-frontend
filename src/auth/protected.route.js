import React, { useState, useEffect } from "react";

import { Route, Redirect } from "react-router-dom";
import auth from "./authservice";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [user, SetUSer] = useState(null);
  const [isTokenValidated, setIsTokenValidated] = useState(false);

  useEffect(() => {
    auth.isAuthenticated().then((login) => {
      if (login) {
        SetUSer(true);
        setIsTokenValidated(true);
      } else {
        SetUSer(false);
        setIsTokenValidated(true);
      }
    });
  }, []);

  if (!isTokenValidated) return <div></div>;

  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );
      }}
    />
  );
};
