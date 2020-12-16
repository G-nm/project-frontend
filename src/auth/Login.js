import React from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

import auth from "./authservice";
import { ShowContext } from "./Showcontext";

const Login = ({ routerprops, ...rest }) => {
  const [eye, SetEye] = React.useState(false);
  const [userData, setUserData] = React.useState({ email: "", pass: "" });
  const { setErrorAlert } = React.useContext(ShowContext);

  const onchangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    await auth.login(userData, (error) => {
      if (error) {
        setErrorAlert(error);
        console.log(error);
      } else {
        routerprops.history.push("/dash/home");
      }
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
              name="email"
              value={userData.email}
              className="w-full h-9 pl-2 rounded outline-none border"
              onChange={onchangeHandler}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div className="flex border rounded">
              <input
                type={eye ? "text" : "password"}
                id="pass"
                name="pass"
                value={userData.pass}
                className="w-full h-9 pl-2 rounded outline-none"
                onChange={onchangeHandler}
                required
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
