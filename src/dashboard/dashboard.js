import React from "react";
import {
  Switch,
  Link,
  BrowserRouter as Router,
  useRouteMatch,
  NavLink,
} from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";

import auth from "../auth/authservice";
import { ProtectedRoute } from "../auth/protected.route";

const myroutes = [
  {
    path: "/dash/home",
    exact: true,
    main: () => <div>You are on main</div>,
  },
  {
    path: "/dash/recipients",
    exact: true,
    main: () => <div>You are on Recipients</div>,
  },
  {
    path: "/dash/merchants",
    exact: true,
    main: () => <div>You are on merchants</div>,
  },
  {
    path: "/dash/deposit",
    exact: true,
    main: () => <div>You are on deposit</div>,
  },
];

const Dashboard = (props) => {
  let { path, url } = useRouteMatch();

  const styles = {
    activelink: "block bg-yellow-300 rounded mx-4 ",
    link: "block mx-4 py-1",
  };

  return (
    <div className="flex h-screen box-border">
      <div className=" rounded-2xl w-72 my-4 ml-4 pt-8 shadow-2xl relative">
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
        <div className=" absolute bottom-6  w-28 ">
          <button
            className="py-1 rounded-lg shadow-xl border"
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

      <div>
        {myroutes.map((route, index) => (
          <ProtectedRoute
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
      </div>

      {/* <button
        onClick={() => {
          auth.logout(() => {
            props.history.push("/");
          });
        }}
      >
        Log out
      </button> */}
    </div>
  );
};

export default Dashboard;
