import React from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

import auth from "./authservice";

const Login = ({ routerprops, ...rest }) => {
  const [eye, SetEye] = React.useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    auth.login(() => {
      routerprops.history.push("/dash");
    });
  };

  return (
    <>
      <section>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label htmlFor="email">Email:</label>
            <br />
            <input
              type="email"
              id="email"
              className="w-full h-9 pl-2 rounded outline-none border"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div className="flex border rounded">
              <input
                type={eye ? "text" : "password"}
                id="pass"
                name="pass"
                className="w-full h-9 pl-2 rounded outline-none "
              />
              <span className="mt-2 text-xl">
                {eye ? (
                  <FiEye
                    className="  cursor-pointer "
                    onClick={(e) => {
                      SetEye(false);
                    }}
                  />
                ) : (
                  <FiEyeOff
                    className=" cursor-pointer"
                    onClick={(e) => {
                      SetEye(true);
                    }}
                  />
                )}
              </span>
            </div>
          </div>
          <button
            className="text-center w-full bg-yellow-300 text-black h-8 mt-5 rounded outline-none font-medium"
            type="submit"
          >
            Log in
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;
