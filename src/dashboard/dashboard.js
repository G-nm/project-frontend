import React from "react";
import {
  Switch,
  Redirect,
  Route,
  useRouteMatch,
  NavLink,
} from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";

import auth from "../auth/authservice";
import { ProtectedRoute } from "../auth/protected.route";
import { Home } from "./home";
import { Recipient } from "./recipients";
import { Merchant } from "./merchants";

import { Deposit } from "./deposit";

const myroutes = [
  {
    path: "/dash/home",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/dash/recipients",
    exact: true,
    main: () => <Recipient />,
  },
  {
    path: "/dash/merchants",
    exact: true,
    main: () => <Merchant />,
  },
  {
    path: "/dash/deposit",
    exact: true,
    main: () => <Deposit />,
  },
];

const Dashboard = (props) => {
  let { url } = useRouteMatch();

  const styles = {
    activelink: "block bg-yellow-300 rounded mx-4 ",
    link: "block mx-4 py-1",
  };

  return (
    <div className="h-screen bg-gray-50 over">
      <div className=" rounded-2xl w-72  ml-4  bg-white fixed h-full">
        <div className="relative top-2 mb-2 h-full  pt-8 rounded border">
          <div className="text-5xl pb-5 font-semibold text-center">MTOG</div>
          <div className="grid grid-rows-4 text-center">
            <div>
              <NavLink
                to={`${url}/home`}
                activeClassName={styles.activelink}
                className={styles.link}
              >
                Dashboard
              </NavLink>
            </div>
            <div>
              <NavLink
                to={`${url}/recipients`}
                activeClassName={styles.activelink}
                className={styles.link}
              >
                Recipients
              </NavLink>
            </div>

            <div>
              <NavLink
                to={`${url}/merchants`}
                activeClassName={styles.activelink}
                className={styles.link}
              >
                Merchants
              </NavLink>
            </div>
            <div>
              <NavLink
                to={`${url}/deposit`}
                activeClassName={styles.activelink}
                className={styles.link}
              >
                Deposit
              </NavLink>
            </div>
          </div>
          <div className=" absolute bottom-6  w-full  flex justify-center">
            <button
              className="py-1 rounded-lg border-2 w-full mx-4  hover:bg-red-500 hover:text-white z-0"
              onClick={() => {
                auth.logout(() => {
                  props.history.push("/");
                });
              }}
            >
              <BiLogOutCircle className="inline" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className=" ml-80  flex flex-col pr-10 h-full  relative bottom-4 ">
        <div className=" shadow sticky top-3 z-10 rounded-2xl flex items-center justify-end bg-white">
          <div className="pr-4 ">
            <span className="font-bold">Balance: </span> <span>10000 </span>
            MTOG
          </div>
        </div>
        <br />
        <div className=" mt-4  top-4 pb-8 rounded-2xl border bg-white h-full w-full overflow-y-auto">
          <Switch>
            {myroutes.map((route, index) => (
              <ProtectedRoute
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
            <Route path="*">
              <Redirect to="/dash/home" />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
