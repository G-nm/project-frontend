// creates a context
// this context raps the whole app

import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { onlogin, onlogout } from "../features/authentication/authSlice";

const authContext = createContext();

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const signin = async ({ email, password }, cb) => {
    try {
      let result = await axios.post(
        `${process.env.REACT_APP_SERVER}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (result.status === 200) {
        const { role } = result.data;
        setUser(role);
        dispatch(onlogin(role));
        return cb("", role);
      }
    } catch (error) {
      console.log(error.response);
      cb(error.response?.data.error || "Error Occurred logging in");
    }
  };

  const signout = async (cb) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_SERVER}/logout`,
        {},
        { withCredentials: true }
      );
      if (result.status === 200) {
        dispatch(onlogout());
        cb();
      }
    } catch (error) {
      return cb("Error Occured Logging out");
    }

    // return fakeAuth.signout(() => {
    //   setUser(null);
    //   cb();
    // });
  };

  return {
    user,
    signin,
    signout,
  };
}
